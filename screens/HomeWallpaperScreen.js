
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Platform, Modal } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "react-native-sqlite-storage";
import RNFS from "react-native-fs";
import { PERMISSIONS, request, check, RESULTS } from "react-native-permissions";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import ImageEditor from "@react-native-community/image-editor";
import { verticalScale } from "../Utils";
import Slider from "@react-native-community/slider";

// Initialize SQLite database
const db = openDatabase({ name: 'wallpaper.db' });

export default function HomeWallpaperScreen({ route, navigation }) {
    const { imageUrl } = route.params;
    const [selected, setSelected] = useState('');
    const [selected2, setSelected2] = useState('blur');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false); // Modal state
    const [value, setValue] = useState(20);
    const [isLiked, setIsLiked] = useState(false); // State to track if wallpaper is liked

    useEffect(() => {
        // Create table if it doesn't exist
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS downloadWallpapers (id INTEGER PRIMARY KEY AUTOINCREMENT, imageUrl TEXT);"
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





    const handledownload = () => {
        // Insert the download wallpaper into the SQLite database
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO downloadWallpapers (imageUrl) VALUES (?);",
                [imageUrl],
                () => {
                    Alert.alert('Success', 'Wallpaper download information saved!');
                    setSelected('download');
                },
                error => {
                    console.error(error);
                }
            );
        });
    };

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

    const saveToGallery = async (imageUrl) => {
        try {
            const permissionGranted = await requestStoragePermission();

            if (permissionGranted) {
                const fileName = `${new Date().getTime()}.jpg`;
                const downloadDest = `${RNFS.CachesDirectoryPath}/${fileName}`;

                const downloadResult = await RNFS.downloadFile({
                    fromUrl: imageUrl,
                    toFile: downloadDest,
                }).promise;

                if (downloadResult.statusCode === 200) {
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
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
                    resizeMode='cover'
                />
            </View>

            {/* Modal for paint editing */}
            {isModalVisible && (
                <View style={styles.modalContainer}>
                    <View style={styles.iconRow}>
                        <View style={{ marginVertical: 20 }}>
                            <Slider
                                style={{ width: 210, height: 40 }}
                                minimumValue={0}
                                maximumValue={100}
                                value={value}
                                onValueChange={setValue}
                                minimumTrackTintColor="#000000"
                                maximumTrackTintColor="#929292"
                                thumbTintColor="#000000"
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelected2('blur');
                                }}
                                style={[selected2 === 'blur']}>
                                <Image source={require('../assets/blur.png')} style={[styles.icon, selected2 === 'blur' && styles.selectedIcon3]} />
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    setSelected2('brightness');
                                }}
                                style={[selected2 === 'brightness']}>
                                <Image source={require('../assets/brightness.png')} style={[styles.icon, selected2 === 'brightness' && styles.selectedIcon3]} />
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    setSelected2('contrast');
                                }}
                                style={[selected2 === 'contrast']}>
                                <Image source={require('../assets/contrast.png')} style={[styles.icon, selected2 === 'contrast' && styles.selectedIcon3]} />
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    setSelected2('saturation');
                                }}
                                style={[selected2 === 'saturation']}>
                                <Image source={require('../assets/saturation.png')} style={[styles.icon, selected2 === 'saturation' && styles.selectedIcon3]} />
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    setSelected2('sharpness');
                                }}
                                style={[selected2 === 'sharpness']}>
                                <Image source={require('../assets/sharpness.png')} style={[styles.icon, selected2 === 'sharpness' && styles.selectedIcon3]} />
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    setSelected2('rgb');
                                }}
                                style={[selected2 === 'rgb']}>
                                <Image source={require('../assets/rgb.png')} style={[styles.icon, selected2 === 'rgb' && styles.selectedIcon3]} />
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>
            )}

            <View style={styles.shadowContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setSelected('home');
                        navigation.navigate('Home');
                    }}
                    style={[styles.homeButton, selected === 'home' && styles.selectedIconButton]}>
                    <Image source={require('../assets/home.png')} style={[styles.homeIcon, selected === 'home' && styles.selectedIcon]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(!isModalVisible);
                        setSelected('paint');
                    }}
                    style={[styles.paintButton, selected === 'paint' && styles.selectedIconButton]}>
                    <Image source={require('../assets/paint.png')} style={[styles.paintIcon, selected === 'paint' && styles.selectedIcon]} />
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
                    onPress={() => setSelected('crop')}
                    style={[styles.cropButton, selected === 'crop' && styles.selectedIconButton]}>
                    <Image source={require('../assets/crop.png')} style={[styles.cropIcon, selected === 'crop' && styles.selectedIcon]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        handledownload();
                        saveToGallery(imageUrl);
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
        backgroundColor: "#EFF0F0",

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
        shadowOffset: { width: 3, height: 3 },
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
        height: responsiveHeight(9),
        width: responsiveWidth(100),
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    homeButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 13,
        elevation: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
    },

    paintButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 13,
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
        marginHorizontal: 13,
        elevation: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
    },

    cropButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.6),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 13,
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
        marginHorizontal: 13,
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

    paintIcon: {
        height: 18,
        width: 20.5,
        tintColor: "#929292"
    },

    likeIcon: {
        height: 16,
        width: 18,
        tintColor: "#929292"
    },

    cropIcon: {
        height: 20,
        width: 20.5,
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
        tintColor: '#1476ff',
    },

    selectedIcon1: {
        tintColor: '#FA3F3F',
    },
    selectedIcon2: {
        tintColor: "#929292"
    },

    dropdownMenu: {
        position: 'absolute',
        top: responsiveHeight(7),
        right: responsiveWidth(4),
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        zIndex: 10,
    },

    dropdownItem: {
        padding: 10,
    },

    dropdownText: {
        fontSize: responsiveFontSize(2),
        color: '#333',
    },

    modalContainer: {
        position: 'absolute',
        height: responsiveHeight(86),
        width: responsiveWidth(95),
        justifyContent: 'flex-end',
        borderRadius: 10,
        alignItems: 'center',
    },

    iconRow: {
        height: responsiveHeight(17),
        width: responsiveWidth(80),
        backgroundColor: "#F3F3F3",
        flexDirection: 'column',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    icon: {
        width: 21,
        height: 21,
        marginHorizontal: 10,
        marginBottom: verticalScale(30),
        tintColor: "#929292"
    },
    selectedIcon3: {
        tintColor: "#000000"
    }

});
