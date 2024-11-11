import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { responsiveScreenHeight, responsiveScreenWidth, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { openDatabase } from "react-native-sqlite-storage";

// Initialize SQLite database
const db = openDatabase({ name: 'wallpaper.db' });


export default function LikeWallpaperScreen({ route, navigation }) {
    const { wallpaper, temporaryRemovedIds = [], setTemporaryRemovedIds = () => { } } = route.params || {};
    const [selected, setSelected] = useState('like');

    if (!wallpaper) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No wallpaper selected.</Text>
            </SafeAreaView>
        );
    }

    const handleLikePress = () => {
        Alert.alert(
            "Remove Wallpaper",
            "Are you sure you want to temporarily remove this wallpaper from your likes?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Remove",
                    onPress: () => {
                        setTemporaryRemovedIds([...temporaryRemovedIds, wallpaper.id]);
                        navigation.goBack(); // Navigate back after temporary removal
                    }
                }
            ],
            { cancelable: false }
        );
    };

 
    return (
        <SafeAreaView style={{ backgroundColor: "#EFF0F0", flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
                    <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dotButton}>
                    <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
                </TouchableOpacity>
            </View>

            <Image
                source={{ uri: wallpaper.imageUrl }}
                style={styles.fullWallpaper}
                resizeMode="cover"
            />

            <View style={styles.shadowContainer}>
                <TouchableOpacity
                     onPress={() => {
                        setSelected('home');
                        navigation.navigate('Home'); // Navigates to the Home screen
                    }}
                    style={[styles.homeButton, selected === 'home' && styles.selectedIconButton]}>
                    <Image source={require('../assets/home.png')} style={[styles.homeIcon, selected === 'home' && styles.selectedIcon]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelected('paint')}
                    style={[styles.paintButton, selected === 'paint' && styles.selectedIconButton]}>
                    <Image source={require('../assets/paint.png')} style={[styles.paintIcon, selected === 'paint' && styles.selectedIcon]} />
                </TouchableOpacity>

                <TouchableOpacity  
                 onPress={handleLikePress}
                    style={[styles.likeButton, selected === 'like' && styles.selectedIconButton]}>
                    <Image source={require('../assets/like.png')} style={[styles.likeIcon, selected === 'like' && styles.selectedIcon1]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelected('crop')}
                    style={[styles.cropButton, selected === 'crop' && styles.selectedIconButton]}>
                    <Image source={require('../assets/crop.png')} style={[styles.cropIcon, selected === 'crop' && styles.selectedIcon]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Download");
                    }}
                    style={[styles.downloadButton, selected === 'download' && styles.selectedIconButton]}>
                    <Image source={require('../assets/download.png')} style={[styles.downloadIcon, selected === 'download' && styles.selectedIcon]} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageview: {
        height: responsiveHeight(8),
        width: responsiveWidth(92),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    arrowButton: {
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
    arrowIcon: {
        height: 15,
        width: 17.5,
        tintColor: "#929292"
    },
    dotIcon: {
        height: 20,
        width: 5,
        tintColor: "#929292"
    },
    fullWallpaper: {
        width: responsiveScreenWidth(92),
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
        justifyContent: 'center',
    },

    homeButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 12,
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
        marginHorizontal: 12,
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
        marginHorizontal: 12,
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
        marginHorizontal: 12,
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
        marginHorizontal: 12,
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
        tintColor: '#4794FF',
    },

    selectedIcon1: {
        tintColor: '#FA3F3F',
    },
});
