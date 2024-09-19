// 
import React, { useEffect, useState, useCallback } from "react";
import { View, SafeAreaView, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { openDatabase } from "react-native-sqlite-storage";
import { useFocusEffect } from '@react-navigation/native';

// Initialize SQLite database
const db = openDatabase({ name: 'wallpaper.db' });

export default function LikeScreen({ navigation }) {
    const [likedWallpapers, setLikedWallpapers] = useState([]);
    const [temporaryRemovedIds, setTemporaryRemovedIds] = useState([]);

    const fetchLikedWallpapers = () => {
        // Fetch liked wallpapers from SQLite database
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM likedWallpapers",
                [],
                (tx, results) => {
                    const rows = results.rows;
                    let wallpapers = [];
                    for (let i = 0; i < rows.length; i++) {
                        wallpapers.push(rows.item(i));
                    }
                    setLikedWallpapers(wallpapers);
                },
                error => {
                    console.error(error);
                }
            );
        });
    };

    useFocusEffect(
        useCallback(() => {
            // Fetch data when the screen is focused
            fetchLikedWallpapers();
        }, [])
    );

    // Filter wallpapers based on temporary removed ids
    const filteredWallpapers = likedWallpapers.filter(w => !temporaryRemovedIds.includes(w.id));
    
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            onPress={() => navigation.navigate("LikeWallpaperScreen", { wallpaper: item, temporaryRemovedIds, setTemporaryRemovedIds })}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.likedWallpaper}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );
    
    return (
        <SafeAreaView style={{ backgroundColor: "#EFF0F0", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
                    <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dotButton}>
                    <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredWallpapers.slice().reverse()} // Reverse the data array here
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={styles.scrollViewContainer}
            />
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
     
    scrollViewContainer: {
        padding: 10,
    },
    likedWallpaper: {
        width: responsiveWidth(43),
        height: responsiveHeight(20),
        borderRadius: 10,
        marginVertical:7,
        marginHorizontal:7
        
    },
    homeButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 40,
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
        marginHorizontal: 40,
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
        marginHorizontal: 40,
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
});

