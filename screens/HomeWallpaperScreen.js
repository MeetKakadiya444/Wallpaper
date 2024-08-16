import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth, } from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WallpaperDetailScreen({ route, navigation }) {
    const { imageUrl } = route.params;
    const handleSkip = () => {
        navigation.navigate("HomeScreen");
    };
    const [selected, setSelected] = useState('home');

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={handleSkip} style={styles.closeButton}>
                    <Image source={require('../assets/close.png')} style={styles.closeIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dotButton}>
                    <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode='cover' // Ensures the image maintains its aspect ratio
                />
            </View>
            <View style={styles.shadowContainer}>
                <TouchableOpacity
                    onPressIn={handleSkip}
                    onPress={() => setSelected('home')}
                    style={[styles.homeButton, selected === 'home' && styles.selectedIconButton]}>
                    <Image source={require('../assets/home.png')} style={[styles.homeIcon, selected === 'home' && styles.selectedIcon]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelected('paint')}
                    style={[styles.paintButton, selected === 'paint' && styles.selectedIconButton]}>
                    <Image source={require('../assets/paint.png')} style={[styles.paintIcon, selected === 'paint' && styles.selectedIcon]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelected('like')}
                    style={[styles.likeButton, selected === 'like' && styles.selectedIconButton]}>
                    <Image source={require('../assets/like.png')} style={[styles.likeIcon, selected === 'like' && styles.selectedIcon1]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelected('crop')}
                    style={[styles.cropButton, selected === 'crop' && styles.selectedIconButton]}>
                    <Image source={require('../assets/crop.png')} style={[styles.cropIcon, selected === 'crop' && styles.selectedIcon]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelected('download')}
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
        justifyContent:'space-between',
        backgroundColor:"#EFF0F0"
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
        height:responsiveScreenHeight(72),
        width: responsiveScreenWidth(100),
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 8,
        marginBottom:10,     
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
        justifyContent: 'center',
    },


    homeButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal:12,
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
        marginHorizontal:12,
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
        marginHorizontal:12,
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
        marginHorizontal:12,
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
        marginHorizontal:12,
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
