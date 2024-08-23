// import React, { useEffect, useState } from "react";
// import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
// import axios from 'axios';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

// const ACCESS_KEY = 'a82f6bf78409bb9e7f0921a410d9d693d06b98a2d5df9a9cdc8295ab3cb261c1';

// const getPhotosFromApi = async (collectionId, page) => {
//     const API_URL = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=20`;
//     try {
//         const response = await axios.get(API_URL);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching photos:', error);
//         return [];
//     }
// };

// export default function ImageScreen({ route, navigation }) {
//     const { collectionId } = route.params; // Get collection ID from navigation params
//     const [images, setImages] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchImages = async () => {
//             setLoading(true);
//             try {
//                 const data = await getPhotosFromApi(collectionId, currentPage);
//                 console.log(data);

//                 const newImages = data.map(photo => ({// use for navigation full image second screen
//                     small: photo.urls.small,
//                     regular: photo.urls.regular,
//                 }));
//                 const existingImageUrls = new Set(images.map(image => image.imageurl));
//                 const filteredImages = newImages.filter(image => !existingImageUrls.has(image.imageurl));
//                 setImages(prevImages => [...prevImages, ...filteredImages]);
//             }
              
//              finally {
//                 setLoading(false);
//             }
//         };

//         fetchImages();
//     }, [currentPage, collectionId]);

//     const loadMoreImages = () => {
//         if (!loading) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };

//     const renderItem = ({ item }) => (
//         <TouchableOpacity 
//         style={styles.itemContainer1} 
//         onPress={() => navigation.navigate('ImageWallpaperScreen', { imageUrl: item.regular})}
//     >
//         <Image source={{ uri: item.small }} style={styles.image} />
//     </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.imageview}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
//                     <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
//                 </TouchableOpacity>
//             </View>
 
//             <FlatList style={styles. flatListContainer}
//                 showsVerticalScrollIndicator={false}
//                 data={images}
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 onEndReached={loadMoreImages}
//                 onEndReachedThreshold={0.5}
//                 numColumns={3}
//             />
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     itemContainer1: {
//         marginVertical: 7,
//         marginHorizontal: 7,
//         borderRadius: 12,
//         width:responsiveWidth(28),
//         height:responsiveHeight(20),
//         overflow: 'hidden',
//     },

//     container: {
//         flex: 1,
//         alignItems: 'center',
//         flexDirection: 'column',
//         backgroundColor: "#EFF0F0",
//     },

//     imageview: {
//         height:responsiveHeight(8),
//         width:responsiveWidth(92),
//         justifyContent:'center', 
        
//     },

//     arrowButton: {
//         height: responsiveHeight(5),
//         width: responsiveWidth(10.6),
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

//     arrowIcon: {
//         height: 15,
//         width: 17.5,
//         tintColor: "#929292"
//     },

//     image: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 12,
//     },

//     flatListContainer: {
//         flex: 1,
//         shadowColor: "#000000",
//         shadowOffset: { width: 3, height: 5 },
//         shadowOpacity: 1,
//         shadowRadius: 5,
//         marginTop: 10
//     },
// });



import React, { useEffect, useState, useCallback } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import axios from 'axios';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const ACCESS_KEY = 'a82f6bf78409bb9e7f0921a410d9d693d06b98a2d5df9a9cdc8295ab3cb261c1';

const getPhotosFromApi = async (collectionId, page) => {
    const API_URL = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=20`;
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching photos:', error);
        return [];
    }
};

export default function ImageScreen({ route, navigation }) {
    const { collectionId } = route.params; // Get collection ID from navigation params
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getPhotosFromApi(collectionId, currentPage);
            console.log(data);

            const newImages = data.map(photo => ({
                id: photo.id, // Add id to help ensure uniqueness
                small: photo.urls.small,
                regular: photo.urls.regular,
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
        } finally {
            setLoading(false);
        }
    }, [collectionId, currentPage]);

    useEffect(() => {
        fetchImages();
    }, [currentPage, collectionId]);

    const loadMoreImages = () => {
        if (!loading) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
        style={styles.itemContainer1} 
        onPress={() => navigation.navigate('ImageWallpaperScreen', { imageUrl: item.regular})}
    >
        <Image source={{ uri: item.small }} style={styles.image} />
    </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
                    <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
            </View>
 
            <FlatList style={styles.flatListContainer}
                showsVerticalScrollIndicator={false}
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} // Use id for unique key
                onEndReached={loadMoreImages}
                onEndReachedThreshold={0.5}
                numColumns={3}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    itemContainer1: {
        marginVertical: 7,
        marginHorizontal: 7,
        borderRadius: 12,
        width:responsiveWidth(28),
        height:responsiveHeight(20),
        overflow: 'hidden',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#EFF0F0",
    },

    imageview: {
        height:responsiveHeight(8),
        width:responsiveWidth(92),
        justifyContent:'center', 
        
    },

    arrowButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.6),
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

    arrowIcon: {
        height: 15,
        width: 17.5,
        tintColor: "#929292"
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },

    flatListContainer: {
        flex: 1,
        shadowColor: "#000000",
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        marginTop: 10
    },
});
