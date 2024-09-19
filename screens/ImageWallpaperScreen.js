import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth, } from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import RNFS from "react-native-fs";
import { PERMISSIONS,request,check,RESULTS } from "react-native-permissions";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

// Initialize SQLite database
const db = openDatabase({ name: 'wallpaper.db' });

export default function ImageWallpaperScreen({ route, navigation }) {
    const { imageUrl } = route.params;
     
    const [selected, setSelected] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(false); // State to track if wallpaper is liked

    useEffect(() => {
        // Create table if it doesn't exist
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS likedWallpapers (id INTEGER PRIMARY KEY AUTOINCREMENT, imageUrl TEXT);"
            );
        });
      // Check if the current wallpaper is already liked
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM likedWallpapers WHERE imageUrl = ?;",
                [imageUrl],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        setIsLiked(true); // Wallpaper is liked
                        setSelected('like');
                    } else {
                        setIsLiked(false); // Wallpaper is not liked
                    }
                },
                error => {
                    console.error(error);
                }
            );
        });
    }, [imageUrl]); // Runs when imageUrl changes

    const handleLike = () => {
        if (isLiked) {
            // If already liked, show an alert to confirm removal
            Alert.alert(
                "Remove Wallpaper",
                "Are you sure you want to remove this wallpaper from your likes?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Remove",
                        onPress: () => {
                            // Remove wallpaper from the SQLite database
                            db.transaction(tx => {
                                tx.executeSql(
                                    "DELETE FROM likedWallpapers WHERE imageUrl = ?;",
                                    [imageUrl],
                                    () => {
                                        Alert.alert('Success', 'Wallpaper removed from likes!');
                                        setIsLiked(false); // Set the state to unliked
                                        setSelected(''); // Clear selected state
                                    },
                                    error => {
                                        console.error(error);
                                    }
                                );
                            });
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
            // If not liked, add the wallpaper to the SQLite database
            db.transaction(tx => {
                tx.executeSql(
                    "INSERT INTO likedWallpapers (imageUrl) VALUES (?);",
                    [imageUrl],
                    () => {
                        Alert.alert('Success', 'Wallpaper liked and saved!');
                        setIsLiked(true); // Set the state to liked
                        setSelected('like');
                    },
                    error => {
                        console.error(error);
                    }
                );
            });
        }
    };

    useEffect(() => {
        // Create table if it doesn't exist
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS downloadWallpapers (id INTEGER PRIMARY KEY AUTOINCREMENT, imageUrl TEXT);"
            );
        });
    }, []);

    const handledownload = () => {
        // Insert the download wallpaper into the SQLite database
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO downloadWallpapers (imageUrl) VALUES (?);",
                [imageUrl],
                () => {
                    Alert.alert('Success', 'Wallpaper download!');
                    setSelected('download');
                },
                error => {
                    console.error(error);
                }
            );
        });
    };
    // Function to check and request storage permission
    const checkStoragePermission = async () => {
        const permission = Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
            : PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY;

        const result = await check(permission);

        switch (result) {
            case RESULTS.GRANTED:
                return true;
            case RESULTS.DENIED:
                return false;
            case RESULTS.BLOCKED:
                Alert.alert('Permission Blocked', 'Please enable storage permission in settings');
                return false;
            default:
                return false;
        }
    };

    const requestStoragePermission = async () => {
        const granted = await checkStoragePermission();
        if (!granted) {
            const result = await request(
                Platform.OS === 'android'
                    ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
                    : PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
            );
            return result === RESULTS.GRANTED;
        }
        return true;
    };

    // Function to save image to gallery
    const saveToGallery = async (imageUrl) => {
        try {
            // First, check and request storage permission
            const permissionGranted = await requestStoragePermission();

            if (permissionGranted) {
                // Define file paths
                const fileName = `${new Date().getTime()}.jpg`;
                const downloadDest = `${RNFS.CachesDirectoryPath}/${fileName}`;

                // Download the image
                const downloadResult = await RNFS.downloadFile({
                    fromUrl: imageUrl,
                    toFile: downloadDest,
                }).promise;

                console.log("----" + downloadResult.statusCode);
                if (downloadResult.statusCode === 200) {
                    // Save to gallery
                 await CameraRoll.save(downloadDest, { type: 'photo' });
                    Alert.alert('Success', 'Image saved to gallery!');
                } else {
                    Alert.alert('Error', 'Failed to download image');
                }
            } else {
                Alert.alert('Permission Denied', 'Permission not granted to access storage');
            }
        } catch (error) {
            console.error('Error saving image to gallery:', error);
            Alert.alert('Error', 'An error occurred while saving the image');
        }
    };
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.imageview}>
                <TouchableOpacity   onPress={() => navigation.goBack()} style={styles.closeButton}>
                    <Image source={require('../assets/close.png')} style={styles.closeIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.dotButton}
                    onPress={() => setDropdownVisible(!isDropdownVisible)}
                >
                    <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
                </TouchableOpacity>
            </View>
            {isDropdownVisible && (
                <View style={styles.dropdownMenu}>
                    <TouchableOpacity style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Rate Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Share App</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.container}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode='cover' // Ensures the image maintains its aspect ratio
                />
            </View>
            <View style={styles.shadowContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setSelected('home');
                        navigation.navigate('Home'); // Navigates to the Home screen
                    }}
                    onPressin={() => setSelected('home')}
                    style={[styles.homeButton, selected === 'home' && styles.selectedIconButton]}>
                    <Image source={require('../assets/home.png')} style={[styles.homeIcon, selected === 'home' && styles.selectedIcon]} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleLike}
                    style={[styles.likeButton, selected === 'like' && styles.selectedIconButton]}
                >
                    <Image
                        source={require('../assets/like.png')}
                        style={[styles.likeIcon, isLiked ? styles.selectedIcon1 : styles.selectedIcon2]} // Ensure proper styling based on isLiked
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handledownload();   // Save download information to the SQLite database
                       saveToGallery(imageUrl);  // Save the image to the gallery
                   }}
                    style={[styles.downloadButton, selected === 'download' && styles.selectedIconButton]}>
                    <Image source={require('../assets/download.png')} style={[styles.downloadIcon, selected === 'download' && styles.selectedIcon]} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#EFF0F0"
    },

    imageview: {
        height: responsiveHeight(8),
        width: responsiveWidth(92),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    closeButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
    },

    closeIcon: {
        height: 14,
        width: 14,
        tintColor: "#929292"
    },

    dotButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 8,
    },

    dotIcon: {
        height: 20,
        width: 5,
        tintColor: "#929292"
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveScreenHeight(72),
        width: responsiveScreenWidth(100),
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 8,
        marginBottom: 10,
    },

    image: {
        width: responsiveWidth(92),
        height: responsiveScreenHeight(72),
        borderRadius: 20,
    },

    shadowContainer: {
        height: responsiveHeight(8),
        width: responsiveWidth(92),
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    homeButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 20,
        elevation: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
    },


    likeButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.6),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 20,
        elevation: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
    },



    downloadButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 20,
        elevation: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
    },

    homeIcon: {
        height: 18,
        width: 20.5,
        tintColor: "#929292"
    },



    likeIcon: {
        height: 16,
        width: 18,
        tintColor: "#929292"
    },


    downloadIcon: {
        height: 22,
        width: 15.5,
        tintColor: "#929292"
    },

    selectedIconButton: {
        backgroundColor: '#F3F3F3',
    },

    selectedIcon: {
        tintColor: '#4794FF',
    },

    selectedIcon1: {
        tintColor: '#FA3F3F',
    },
    selectedIcon2: {
        tintColor: "#929292"
    },

    dropdownMenu: {
        position: 'absolute',
        top: responsiveHeight(9),
        right: responsiveWidth(4),
        width: responsiveWidth(40),
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 10,
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
        zIndex: 1
    },

    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    dropdownText: {
        fontSize: responsiveFontSize(1.7),
        color: '#898989',
    }
});
