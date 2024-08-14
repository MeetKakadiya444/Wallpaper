import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default function CollectionScreen({ navigation }) {
    const handleSkip = (collectionId) => {
        navigation.navigate("ImageScreen", { collectionId }); // Pass the collection ID
    };

    const [images, setImages] = useState([]);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const ACCESS_KEY = 'a82f6bf78409bb9e7f0921a410d9d693d06b98a2d5df9a9cdc8295ab3cb261c1';

    const getPhotosFromApi = async () => {
        const API_CALL = `https://api.unsplash.com/search/collections/?client_id=${ACCESS_KEY}&query=nature&page=1&per_page=20`;

        try {
            let response = await axios.get(API_CALL);
            const collectionData = response.data.results;
            console.log('Fetched Data:', collectionData); // Log the fetched data
            const collections = collectionData.map(item => ({
                id: item.id,
                coverPhoto: item.cover_photo.urls.thumb,
                title: item.title,
                total_photos: item.total_photos
            }));
            console.log('Processed Collections:', collections);
            setImages(collections); // Store collection data in the state
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        getPhotosFromApi();
    }, []);

    const renderItem = ({ item }) => {
        console.log('Rendering item:', item); // Log item to ensure title is correct
        return (
            <TouchableOpacity 
                onPress={() => handleSkip(item.id)} // Pass the collection ID
                style={styles.collection}
            >
                <ImageBackground source={{ uri: item.coverPhoto }} style={styles.coverImage} >
                    <View style={{ alignItems:'center', width: '30%', height:'30%', justifyContent:'center' }}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={{ width: '95%', height: '60%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text style={styles.total_photos}>{item.total_photos}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    const keyExtractor = (item) => item && item.id ? item.id.toString() : 'default_key';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowButton}>
                    <Image source={require('../assets/arrow.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearchVisible(!isSearchVisible)}>
                        <Image source={require('../assets/search.png')} style={styles.searchIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dotButton}>
                        <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, flex: 1 }}>
                <FlatList
                    style={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFF0F0",
        alignItems:'center'
    },
    imageview: {
        height:responsiveHeight(8),
        width:responsiveWidth(95),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    arrowButton: {
        height: 35,
        width: 35,
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
        height: 35,
        width: 35,
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
        height: 35,
        width: 35,
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
    flatListContainer: {
        flex: 1,
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
        marginTop: 5
    },
    collection: {
        height: responsiveHeight(23),
        width: responsiveWidth(95),
        marginVertical: 10,
         
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        overflow: 'hidden'
    },
    coverImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        color: "#FFFFFF",
    },
    total_photos: {
        fontSize: 15,
        color: "#FFFFFF"
    }
});
