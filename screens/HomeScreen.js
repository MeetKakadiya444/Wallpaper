import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";

const ACCESS_KEY = 'a82f6bf78409bb9e7f0921a410d9d693d06b98a2d5df9a9cdc8295ab3cb261c1';

const getPhotosFromApi = (page) => {
    const API_URL = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&page=${page}&order_by=latest&per_page=20`;
    return fetch(API_URL)
        .then(response => response.json())
        .then(json => json)
};

export default function HomeScreen({ navigation }) {
    
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const data = await getPhotosFromApi(currentPage);
                console.log(data);

                const newImages = data.map(photo => ({
                    imageurl: photo.urls.small
                }));

                const existingImageUrls = new Set(images.map(image => image.imageurl));
                const filteredImages = newImages.filter(image => !existingImageUrls.has(image.imageurl));

                setImages(prevImages => [...prevImages, ...filteredImages]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [currentPage]);

    const loadMoreImages = () => {
        if (!loading) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handleTap = (index) => {
        const now = Date.now();
        if (now - lastTap < 100) {

            return;
        }
        setLastTap(now);

        console.log(`Tapped on image ${index}`);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer1}>
            <Image source={{ uri: item.imageurl }} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageview}>
                <TouchableOpacity style={styles.searchButton}>
                    <Image source={require('../assets/search.png')} style={styles.searchIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dotButton}>
                    <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.View1}>
                <TouchableOpacity style={styles.Collection}>
                    <Text style={styles.Text}>Collection</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Collection}>
                    <Text style={styles.Text}>Live{"\n"}Wallpaper</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Collection}>
                    <Text style={styles.Text}>Popular</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Collection}>
                    <Text style={styles.Text}>Random</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.View2}>
                <View style={{ justifyContent: 'center', height: '6%', width: '100%' }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: "#898989", marginTop: 5, marginLeft: 11 }}>Latest</Text>
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
        width: 92,
        height: 130,
        overflow: 'hidden',
    },
    flatListContainer1: {
        flex: 1,
        
    },
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#EFF0F0",
    },
    imageview: {
        height: '8%',
        width: "100%",
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchButton: {
        height: 35,
        width: 35,
        backgroundColor: "#F3F3F3",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 5,
        elevation: 15,
        shadowColor: "#000000",
    },
    dotButton: {
        height: 35,
        width: 35,
        backgroundColor: "#F3F3F3",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginHorizontal: 5,
        marginRight: 15,
        elevation: 20,
        shadowColor: "#000000",
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
        width: '100%',
        height: "7%",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    Collection: {
        height: 35,
        width: 80,
        backgroundColor: "#F3F3F3",
        marginHorizontal: 4,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowColor: "#000000",
    },
    Text: {
        fontSize: 12,
        fontWeight: '400',
        color: "#898989",
        textAlign: 'center'
    },
    View2: {
        height: '100%',
        width: '93%',
        backgroundColor: "#F9F9F9",
        marginTop: 20,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        flex: 1,
        alignItems:'center',
        
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
});



