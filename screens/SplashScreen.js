import React, { useEffect } from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { horizontalScale, verticalScale } from "../Utils"

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("");
        }, 1000);
    }, [navigation]);
    return (
        <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1, alignItems: "center" }}>
            <View style={{ marginTop: 30, height: '57%', width: '100%', alignItems: 'center' }}>
                <Image source={require('../assets/splash.png')}
                    style={{ width: 351, height: 365 }} />
            </View>
            <View style={{ height: '26%', width: '100%',  alignItems: 'center' }}>
                <Text style={{ fontSize: 36, color: "#545B5E", fontWeight: '500' }}>Welcome!</Text>
                <Text style={{ textAlign: 'center', color: "#B7AEAE", fontSize: 14, fontWeight: '300', marginTop: 20 }}>We make cool wallpaper for you,{"\n"}
                    which you can enjoy and use for free.</Text>
                <Text style={{ color: "#A09898", fontSize: 18, fontWeight: '400', marginTop: 10 }}>Let’s go to explorer.</Text>
            </View>
            <View style={{ height: '10%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: "#4794FF", height: 40, width: 106, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: "#363D3F" }}>GO!</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}