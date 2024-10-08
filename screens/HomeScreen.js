import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const ACCESS_KEY = 'a82f6bf78409bb9e7f0921a410d9d693d06b98a2d5df9a9cdc8295ab3cb261c1';


const getPhotosFromApi = (page, apiType) => {
    const ORDER_BY = apiType || 'latest';
    const API_URL = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&page=${page}&order_by=${ORDER_BY}&per_page=20`;
    return fetch(API_URL)
        .then(response => response.json())
        .then(json => json);
};

export default function HomeScreen({ navigation }) {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [apiType, setApiType] = useState('latest');
    const [selected, setSelected] = useState('home');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          navigation.setOptions({ tabBarVisible: true });
        });
      
        return unsubscribe;
      }, [navigation]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getPhotosFromApi(currentPage, apiType);
                console.log('API Response Data:', data);

                if (Array.isArray(data)) {
                    const newImages = data.map(photo => ({
                        small: photo.urls.small,
                        regular: photo.urls.regular,
                    }));

                    const existingImageUrls = new Set(images.map(image => image.small));
                    const filteredImages = newImages.filter(image => !existingImageUrls.has(image.small));

                    setImages(prevImages => [...prevImages, ...filteredImages]);
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [currentPage, apiType]);

    const loadMoreImages = () => {
        if (!loading) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlelatestPress = () => {
        setApiType('latest');
        setCurrentPage(1);
        setImages([]);
    };

    const handlePopularPress = () => {
        setApiType('popular');
        setCurrentPage(1);
        setImages([]);
    };

    const handleRandomPress = () => {
        setApiType('random');
        setCurrentPage(1);
        setImages([]);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer1}
            onPress={() => navigation.navigate('HomeWallpaperScreen', { imageUrl: item.regular })}
        >
            <Image source={{ uri: item.small }} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={styles.searchButton}>
                    <Image source={require('../assets/search.png')} style={styles.searchIcon} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.dotButton}>
                    <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
                </TouchableOpacity> */}
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


            <View style={styles.View1}>
                <TouchableOpacity onPress={() => navigation.navigate("CollectionScreen")} style={styles.Collection} >
                    <Text style={styles.Text}>Collection</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handlelatestPress} style={styles.Collection}>
                    <Text style={styles.Text}>Latest</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePopularPress} style={styles.Collection}>
                    <Text style={styles.Text}>Popular</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRandomPress} style={styles.Collection}>
                    <Text style={styles.Text}>Random</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.View2}>
                <View style={{ justifyContent: 'center', height: '6%', width: '100%' }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "#898989", marginTop: 5, marginLeft: 11 }}>
                        {apiType.charAt(0).toUpperCase() + apiType.slice(1)}
                    </Text>
                </View>
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

    flatListContainer1: {
        flex: 1,
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        marginTop: 5
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
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
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
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 8,
    },

    searchIcon: {
        height: 14,
        width: 14,
        tintColor: "#929292"
    },

    dotIcon: {
        height: 20,
        width: 5,
        tintColor: "#929292"
    },

    View1: {
        width: responsiveWidth(90),
        height: responsiveHeight(10),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },

    Collection: {
        height: responsiveHeight(5),
        width: responsiveWidth(21),
        backgroundColor: "#FFFFFF",
        marginHorizontal: 4,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 9,
    },

    Text: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: '400',
        color: "#898989",
        textAlign: 'center'
    },

    View2: {
        height: responsiveHeight(100),
        width: responsiveWidth(90),
        backgroundColor: "#F9F9F9",
        marginTop: 10,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        flex: 1,
        alignItems: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
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

    dropdownMenu: {
        position: 'absolute',
        top: responsiveHeight(9),
        right: responsiveWidth(5),
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
