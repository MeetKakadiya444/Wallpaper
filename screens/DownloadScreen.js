// import React, { useEffect, useState } from "react";
// import { View, SafeAreaView, Image, TouchableOpacity, StyleSheet } from "react-native";
// import {responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

// export default function DownloadScreen({ navigation }) {
//     const handleSkip = () => {
//         navigation.navigate("HomeScreen");
//     };
//     const handleSkip1 = () => {
//         navigation.navigate("LikeScreen");
//     };
//     const [selected, setSelected] = useState('download');


//     return (
//         <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: "#000000" }}>
//             <View style={styles.imageview}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
//                     <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.dotButton}>
//                     <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.shadowContainer}>
//                 <TouchableOpacity onPressIn={handleSkip}
//                     onPress={() => setSelected('home')}
//                     style={[styles.homeButton, selected === 'home' && styles.selectedIconButton]}>
//                     <Image source={require('../assets/home.png')} style={[styles.homeIcon, selected === 'home' && styles.selectedIcon]} />
//                 </TouchableOpacity>

//                 <TouchableOpacity onPressIn={handleSkip1}
//                     onPress={() => setSelected('like')}
//                     style={[styles.likeButton, selected === 'like' && styles.selectedIconButton]}>
//                     <Image source={require('../assets/like.png')} style={[styles.likeIcon, selected === 'like' && styles.selectedIcon1]} />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => setSelected('download')}
//                     style={[styles.downloadButton, selected === 'download' && styles.selectedIconButton]}>
//                     <Image source={require('../assets/download.png')} style={[styles.downloadIcon, selected === 'download' && styles.selectedIcon]} />
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// }
// const styles = StyleSheet.create({
//     imageview: {
//         height: responsiveHeight(10),
//         width: responsiveWidth(95),
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },

//     arrowButton: {
//         height: responsiveHeight(5),
//         width: responsiveWidth(10.5),
//         backgroundColor: "#FFFFFF",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 40,
//         elevation: 20,
//         shadowColor: "#000000",
//         shadowOffset: { width: 6, height: 6 },
//         shadowOpacity: 1,
//         shadowRadius: 9,
//     },

//     dotButton: {
//         height: responsiveHeight(5),
//         width: responsiveWidth(10.5),
//         backgroundColor: "#FFFFFF",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 40,
//         elevation: 20,
//         shadowColor: "#000000",
//         shadowOffset: { width: 6, height: 6 },
//         shadowOpacity: 1,
//         shadowRadius: 8,
//     },

//     arrowIcon: {
//         height: 15,
//         width: 17.5,
//         tintColor: "#929292"
//     },

//     dotIcon: {
//         height: 20,
//         width: 5,
//         tintColor: "#929292"
//     },
//     shadowContainer: {
//         height: responsiveHeight(8),
//         width: responsiveWidth(100),
//         backgroundColor: "#FFFFFF",
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         elevation: 20,
//         shadowColor: "#000000",
//         shadowOffset: { width: 5, height: 0 },
//         shadowOpacity: 1,
//         shadowRadius: 5,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     homeButton: {
//         height: responsiveHeight(5),
//         width: responsiveWidth(10.5),
//         backgroundColor: "#FFFFFF",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 40,
//         marginHorizontal: 40,
//         elevation: 10,
//         shadowColor: "#000000",
//         shadowOffset: { width: 6, height: 6 },
//         shadowOpacity: 1,
//         shadowRadius: 9,
//     },

//     likeButton: {
//         height: responsiveHeight(5),
//         width: responsiveWidth(10.6),
//         backgroundColor: "#FFFFFF",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 40,
//         marginHorizontal: 40,
//         elevation: 10,
//         shadowColor: "#000000",
//         shadowOffset: { width: 6, height: 6 },
//         shadowOpacity: 1,
//         shadowRadius: 9,
//     },

//     downloadButton: {
//         height: responsiveHeight(5),
//         width: responsiveWidth(10.5),
//         backgroundColor: "#FFFFFF",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 40,
//         marginHorizontal: 40,
//         elevation: 10,
//         shadowColor: "#000000",
//         shadowOffset: { width: 6, height: 6 },
//         shadowOpacity: 1,
//         shadowRadius: 9,
//     },

//     homeIcon: {
//         height: 18,
//         width: 20.5,
//         tintColor: "#929292"
//     },

//     likeIcon: {
//         height: 16,
//         width: 18,
//         tintColor: "#929292"
//     },

//     downloadIcon: {
//         height: 22,
//         width: 15.5,
//         tintColor: "#929292"
//     },

//     selectedIconButton: {
//         backgroundColor: '#F3F3F3',
//     },

//     selectedIcon: {
//         tintColor: '#4794FF',
//     },

//     selectedIcon1: {
//         tintColor: '#FA3F3F',
//     },
// });


import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { openDatabase } from "react-native-sqlite-storage";

// Initialize SQLite database
const db = openDatabase({ name: 'wallpaper.db' });

export default function DownloadScreen({ navigation }) {
    const [likedWallpapers, setLikedWallpapers] = useState([]);
    const [temporaryRemovedIds, setTemporaryRemovedIds] = useState([]);
    const [selected, setSelected] = useState('download');

    useEffect(() => {
        // Fetch liked wallpapers from SQLite database
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM downloadWallpapers",
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
    }, []);


    // Filter wallpapers based on temporary removed ids
    const filteredWallpapers = likedWallpapers.filter(w => !temporaryRemovedIds.includes(w.id));

    return (
        <SafeAreaView style={{ backgroundColor: "#EFF0F0", flex: 1, alignItems: 'center' }}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
                    <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dotButton}>
                    <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                {filteredWallpapers.slice().reverse().map((wallpaper, index) => (
                    <TouchableOpacity
                        key={index}
                        >
                        <Image
                            source={{ uri: wallpaper.imageUrl }}
                            style={styles.likedWallpaper}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.shadowContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("HomeScreen");
                    }}
                    style={[styles.homeButton, selected === 'home' && styles.selectedIconButton]}>
                    <Image source={require('../assets/home.png')} style={[styles.homeIcon, selected === 'home' && styles.selectedIcon]} />
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {
                 navigation.navigate("LikeScreen");
                }} 
                    style={[styles.likeButton, selected === 'like' && styles.selectedIconButton]}>
                    <Image source={require('../assets/like.png')} style={[styles.likeIcon, selected === 'like' && styles.selectedIcon1]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setSelected('download');
                        navigation.navigate("DownloadScreen");
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
        width: responsiveWidth(95),
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
    shadowContainer: {
        height: responsiveHeight(8),
        width: responsiveWidth(100),
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
    scrollViewContainer: {
        padding: 10,
    },
    likedWallpaper: {
        width: responsiveWidth(90),
        height: responsiveHeight(20),
        borderRadius: 10,
        marginBottom: 20,
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

