import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

// Screens
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import HomeWallpaperScreen from "./screens/HomeWallpaperScreen";
import CollectionScreen from "./screens/CollectionScreen";
import ImageScreen from "./screens/ImageScreen";
import ImageWallpaperScreen from "./screens/ImageWallpaperScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchWallpaperScreen from "./screens/SearchWallpaperScreen";
import LikeScreen from "./screens/LikeScreen";
import LikeWallpaperScreen from "./screens/LikeWallpaperScreen";
import DownloadScreen from "./screens/DownloadScreen";

// Icons
import HomeIcon from "./assets/home.png";
import LikeIcon from "./assets/like.png";
import DownloadIcon from "./assets/download.png";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabnavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 10,
          shadowColor: '#000000',
          shadowOffset: { width: 6, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 9,
          height: responsiveHeight(8),
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{
              height: responsiveHeight(5),
              width: responsiveWidth(10.5),
              backgroundColor: "#FFFFFF",
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
              elevation: 10,
              shadowColor: "#000000",
              shadowOffset: { width: 6, height: 6 },
              shadowOpacity: 1,
              shadowRadius: 9
            }}>
              <Image source={HomeIcon} style={{ width: 20.5, height: 18, tintColor: color }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Like"
        component={LikeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{
              height: responsiveHeight(5),
              width: responsiveWidth(10.6),
              backgroundColor: "#FFFFFF",
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
              elevation: 10,
              shadowColor: "#000000",
              shadowOffset: { width: 6, height: 6 },
              shadowOpacity: 1,
              shadowRadius: 9
            }}>
              <Image source={LikeIcon} style={{ width: 18, height: 16, tintColor: color }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Download"
        component={DownloadScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{
              height: responsiveHeight(5),
              width: responsiveWidth(10.5),
              backgroundColor: "#FFFFFF",
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
              elevation: 10,
              shadowColor: "#000000",
              shadowOffset: { width: 6, height: 6 },
              shadowOpacity: 1,
              shadowRadius: 9
            }}>
              <Image source={DownloadIcon} style={{ width: 15.5, height: 22, tintColor: color }} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Tabs" component={Tabnavigator}   />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="HomeWallpaperScreen" component={HomeWallpaperScreen} />
        <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
        <Stack.Screen name="ImageWallpaperScreen" component={ImageWallpaperScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="SearchWallpaperScreen" component={SearchWallpaperScreen} />
        <Stack.Screen name="LikeWallpaperScreen" component={LikeWallpaperScreen} />
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}
