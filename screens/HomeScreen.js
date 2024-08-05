import React from "react";
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageview}>
                <TouchableOpacity style={styles.searchButton}>
                    <Image source={require('../assets/search.png')} style={styles.searchIcon}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dotButton}>
                    <Image source={require('../assets/dot.png')} style={styles.dotIcon}></Image>
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
                    <Text style={styles.Text}>Popullar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Collection}>
                    <Text style={styles.Text}>Random</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.View2}>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#EFF0F0"
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
        marginHorizontal: 5,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowColor: "#000000",
    },

    Text:{
        fontSize:12,
        fontWeight:'400',
        color:"#898989",
        textAlign:'center'
    },
    View2:{
       height:'100%',
       width:'92%',
       backgroundColor:"#E5E5E5",
       marginTop:20,
       borderWidth:2,
       borderColor:"#FFFFFF",
       borderRadius:25
    }
    
});
