import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, TextInput } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth, useResponsiveFontSize } from "react-native-responsive-dimensions";
import { useDebounce } from 'use-debounce';

export default function CollectionScreen({ navigation }) {
    const [images, setImages] = useState([]);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery] = useDebounce(searchQuery); // Debounce search query
    const [isDropdownVisible, setDropdownVisible] = useState(false);


    const ACCESS_KEY = 'a82f6bf78409bb9e7f0921a410d9d693d06b98a2d5df9a9cdc8295ab3cb261c1';

    const getPhotosFromApi = async (query) => {
        const API_CALL = `https://api.unsplash.com/search/collections/?client_id=${ACCESS_KEY}&query=${query}&page=1&per_page=20`;

        try {
            let response = await axios.get(API_CALL);
            const collectionData = response.data.results;
            console.log('Fetched Data:', collectionData);
            const collections = collectionData.map(item => ({
                id: item.id,
                coverPhoto: item.cover_photo.urls.thumb,
                title: item.title,
                total_photos: item.total_photos
            }));
            console.log('Processed Collections:', collections);
            setImages(collections);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        getPhotosFromApi("nature");
    }, []);

    useEffect(() => {
        if (debouncedQuery.length >= 3) {
            getPhotosFromApi(debouncedQuery);
        } else if (debouncedQuery.length === 2) {
            getPhotosFromApi("nature"); // Reset to default query if search is cleared
        }
    }, [debouncedQuery]);

    const onSearchChange = (text) => {
        console.log('Search Input Changed:', text); // Debug log
        setSearchQuery(text);
    };

    const handleSkip = (collectionId) => {
        navigation.navigate("ImageScreen", { collectionId });
    };

    const renderItem = ({ item }) => {
        console.log('Rendering item:', item);
        return (
            <TouchableOpacity
                onPress={() => handleSkip(item.id)}
                style={styles.collection}
            >
                <ImageBackground source={{ uri: item.coverPhoto }} style={styles.coverImage}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={styles.totalPhotosContainer}>
                        <Text style={styles.total_photos}>{item.total_photos}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
                    <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
                </TouchableOpacity>

                {isSearchVisible ? (
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search collections"
                            placeholderTextColor={"#000000"}
                            value={searchQuery}
                            onChangeText={onSearchChange}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="search"
                            selectionColor={"#000000"}
                        />
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => {
                                setIsSearchVisible(false);
                                setSearchQuery(""); // Clear search query
                                getPhotosFromApi("nature"); // Reset to default query
                            }}
                        >
                            <Image source={require('../assets/close.png')} style={styles.searchIcon} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.searchIconContainer}>
                        <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearchVisible(true)}>
                            <Image source={require('../assets/search.png')} style={styles.searchIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dotButton}
                            onPress={() => setDropdownVisible(!isDropdownVisible)}
                        >
                            <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
                        </TouchableOpacity>

                    </View>

                )}
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

            </View>

            <View style={styles.flatListContainerWrapper}>
                <FlatList
                    style={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFF0F0",
        alignItems: 'center'
    },

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

    searchButton: {
        height: responsiveHeight(5),
        width: responsiveWidth(10.5),
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 10,
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
        marginHorizontal: 5,
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

    searchIcon: {
        height: 14,
        width: 14,
        tintColor: "#929292",
    },

    dotIcon: {
        height: 20,
        width: 5,
        tintColor: "#929292"
    },

    flatListContainerWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },

    flatListContainer: {
        flex: 1,
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },

    collection: {
        height: responsiveHeight(23),
        width: responsiveWidth(95),
        marginVertical: 7,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        overflow: 'hidden'
    },

    coverImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },

    titleContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
    },

    title: {
        fontSize: responsiveFontSize(2.9),
        color: "#FFFFFF",
        marginLeft: 25
    },

    totalPhotosContainer: {
        width: '95%',
        height: '60%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    total_photos: {
        fontSize: responsiveFontSize(2.3),
        color: "#FFFFFF"
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: responsiveWidth(87),
        height: responsiveHeight(5.5),
    },

    searchInput: {
        width: responsiveWidth(68),
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

    searchIconContainer: {
        flexDirection: 'row',
        width: responsiveWidth(28),

    },

    dropdownMenu: {
        position: 'absolute',
        top: responsiveHeight(9),
        right: responsiveWidth(0),
        width: responsiveWidth(40),
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 10,
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
        zIndex:1
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
