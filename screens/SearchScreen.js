// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from "react-native";
// import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

// const ACCESS_KEY = 'a82f6bf78409bb9e7f0921a410d9d693d06b98a2d5df9a9cdc8295ab3cb261c1';

// const getPhotosFromApi = async (page, query) => {
//     const API_URL = `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&page=${page}&query=${query}&per_page=20`;
//     console.log('Fetching from URL:', API_URL); // Debugging line
//     try {
//         let response = await axios.get(API_URL);
//         return response.data.results;
//     } catch (error) {
//         console.error('API Error:', error.response ? error.response.data : error.message);
//         return [];
//     }
// };

// export default function WallpaperScreen({ navigation }) {
//     const handleSkip = () => {
//         navigation.navigate("HomeScreen");
//     };


//     const [images, setImages] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [query, setQuery] = useState('rain'); // Set default query for API calls
//     const [inputValue, setInputValue] = useState(''); // Manage TextInput value separately

//     const loadImages = async () => {
//         try {
//             let data = await getPhotosFromApi(currentPage, query);
//             const newImages = data.map(photo => ({// use for navigation full image second screen
//                 small: photo.urls.small,
//                 regular: photo.urls.regular,
//             }));
//             const existingImageUrls = new Set(images.map(image => image.imageurl));
//             const filteredImages = newImages.filter(image => !existingImageUrls.has(image.imageurl));
//             setImages(prevImages => [...prevImages, ...filteredImages]);
//         } catch (error) {
//             console.error('API Error:', error.response ? error.response.data : error.message);
//         } finally {
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         loadImages();
//     }, [currentPage, query]); // Fetch images when currentPage or query changes

//     useEffect(() => {
//         setCurrentPage(1); // Reset to first page
//         setImages([]); // Clear images
//         loadImages(); // Fetch new images with the default query
//     }, []); // Empty dependency array means this runs only on mount

//     const loadMoreImages = () => {
//         if (!loading) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };

//     const renderItem = ({ item }) => (//use to full im age shaw second screen
//         <TouchableOpacity
//             style={styles.itemContainer1}
//             onPress={() => navigation.navigate('SearchWallpaperScreen', { imageUrl: item.regular })}
//         >
//             <Image source={{ uri: item.small }} style={styles.image} />
//         </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.imageview}>
//                 <TouchableOpacity onPress={handleSkip} style={styles.closeButton}>
//                     <Image source={require('../assets/close.png')} style={styles.closeIcon} />
//                 </TouchableOpacity>

//                 <View style={styles.searchContainer}>
//                     <TextInput
//                         style={styles.searchInput}
//                         placeholder="Search Photos"
//                         placeholderTextColor={"#000000"}
//                         selectionColor={"#000000"}
//                         onChangeText={(text) => {
//                             setInputValue(text);
//                             setQuery(text || 'sky'); // Use 'sky' if input is empty
//                             setCurrentPage(1); // Reset to first page on new query
//                             setImages([]); // Clear images on new query
//                         }}
//                         value={inputValue} // Use inputValue state for TextInput
//                     />
//                 </View>
//             </View>

//             <View style={styles.View2}>
//                 <View style={styles.flatListContainer1}>
//                     <FlatList

//                         vertical
//                         showsVerticalScrollIndicator={false}
//                         data={images}
//                         renderItem={renderItem}
//                         numColumns={3}
//                         keyExtractor={(item, index) => index.toString()}
//                         onEndReached={loadMoreImages}
//                         onEndReachedThreshold={0.5}
//                     />
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const ACCESS_KEY = 'a82f6bf78409bb9e7f0921a410d9d693d06b98a2d5df9a9cdc8295ab3cb261c1';

const getPhotosFromApi = async (page, query) => {
    const API_URL = `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&page=${page}&query=${query}&per_page=20`;
    console.log('Fetching from URL:', API_URL); // Debugging line
    try {
        let response = await axios.get(API_URL);
        return response.data.results;
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        return [];
    }
};

export default function  SearchScreen({ navigation }) {
    const handleSkip = () => {
        navigation.navigate("HomeScreen");
    };

    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('rain'); // Set default query for API calls
    const [inputValue, setInputValue] = useState(''); // Manage TextInput value separately

    const loadImages = async () => {
        setLoading(true); // Start loading
        try {
            let data = await getPhotosFromApi(currentPage, query);
            const newImages = data.map(photo => ({
                small: photo.urls.small,
                regular: photo.urls.regular,
            }));
            const existingImageUrls = new Set(images.map(image => image.regular));
            const filteredImages = newImages.filter(image => !existingImageUrls.has(image.regular));
            setImages(prevImages => [...prevImages, ...filteredImages]);
        } catch (error) {
            console.error('API Error:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        loadImages();
    }, [currentPage, query]); // Fetch images when currentPage or query changes

    useEffect(() => {
        setCurrentPage(1); // Reset to first page
        setImages([]); // Clear images
        loadImages(); // Fetch new images with the default query
    }, []); // Empty dependency array means this runs only on mount

    const loadMoreImages = () => {
        if (!loading) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer1}
            onPress={() => navigation.navigate('SearchWallpaperScreen', { imageUrl: item.regular })}
        >
            <Image source={{ uri: item.small }} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={handleSkip} style={styles.closeButton}>
                    <Image source={require('../assets/close.png')} style={styles.closeIcon} />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Photos"
                        placeholderTextColor={"#000000"}
                        selectionColor={"#000000"}
                        onChangeText={(text) => {
                            setInputValue(text);
                            setQuery(text || 'sky'); // Use 'sky' if input is empty
                            setCurrentPage(1); // Reset to first page on new query
                            setImages([]); // Clear images on new query
                        }}
                        value={inputValue} // Use inputValue state for TextInput
                    />
                </View>
            </View>

            <View style={styles.View2}>
                <View style={styles.flatListContainer1}>
                    <FlatList
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={images}
                        renderItem={renderItem}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={loadMoreImages}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    itemContainer1: {
        marginVertical: 7,
        marginHorizontal: 7,
        borderRadius: 12,
        width: responsiveWidth(25),
        height: responsiveHeight(20),
        overflow: 'hidden',
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: responsiveWidth(79),
        height: responsiveHeight(5.5),
    },

    searchInput: {
        width: responsiveWidth(74),
        height: responsiveHeight(5.5),
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        paddingLeft: 20,
        fontSize: 16,
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
    },

    flatListContainer1: {
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        marginTop: 15,
        marginBottom: 15
    },

    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#EFF0F0",
    },

    imageview: {
        height: responsiveHeight(10),
        width: responsiveWidth(90),
        flexDirection: 'row',
        alignItems: 'center'
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

    View2: {
        height: responsiveHeight(87),
        width: responsiveWidth(90),
        backgroundColor: "#F9F9F9",
        marginTop: 10,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        borderRadius: 25,
        alignItems: 'center',
    },
    
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
});
