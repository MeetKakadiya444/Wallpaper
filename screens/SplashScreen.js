import React, { useEffect } from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default function SplashScreen({ navigation }) {
    const handleSkip = () => {
        navigation.navigate("HomeScreen");
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1, alignItems: "center" }}>
            <View style={{ flexL: 1, marginTop: 30, height: responsiveHeight(57), width: responsiveWidth(100), alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../assets/splash.png')}
                    style={{ width: responsiveWidth(87.5), height: responsiveHeight(45.2) }} />
            </View>
            <View style={{ height: '26%', width: '100%', alignItems: 'center' }}>
                <Text style={{ fontSize: responsiveFontSize(5), color: "#545B5E", fontWeight: '500', marginTop: 10 }}>Welcome!</Text>
                <Text style={{ textAlign: 'center', color: "#B7AEAE", fontSize: responsiveFontSize(2), fontWeight: '300', marginTop: 20 }}>We make cool wallpaper for you,{"\n"}
                    which you can enjoy and use for free.</Text>
                <Text style={{ color: "#A09898", fontSize: responsiveFontSize(2.5), fontWeight: '400', marginTop: 10 }}>Let's go to explorer.</Text>
            </View>
            <View style={{ height: '10%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={handleSkip} style={{ backgroundColor: "#4794FF", height: responsiveHeight(5.5), width: responsiveWidth(26), borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '700', color: "#363D3F" }}>GO!</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}