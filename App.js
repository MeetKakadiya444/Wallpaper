import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import HomeWallpaperScreen from "./screens/HomeWallpaperScreen";
import CollectionScreen from "./screens/CollectionScreen";
import ImageScreen from "./screens/ImageScreen";
import ImageWallpaperScreen from "./screens/ImageWallpaperScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchWallpaperScreen from "./screens/SearchWallpaperScreen";
import LikeScreen from "./screens/LikeScreen";
import  LikeWallpaperScreen from "./screens/LikeWallpaperScreen";
import  DownloadScreen from "./screens/DownloadScreen";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
 
const Tab=createBottomTabNavigator();
const Stack= createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
       <Tab.Navigator>
            <Tab.Screen name="home" component={HomeScreen}  options={{ headerShown:false }} ></Tab.Screen>
            <Tab.Screen name="like" component={LikeScreen} options={{ headerShown:false }}></Tab.Screen>
            <Tab.Screen name="download" component={DownloadScreen} options={{ headerShown:false }}></Tab.Screen>
            
       </Tab.Navigator>
    </NavigationContainer>

  // <NavigationContainer>
  //   <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
  //       <Stack.Screen name="SplashScreen" component={SplashScreen}></Stack.Screen>
  //       <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
  //        <Stack.Screen name="HomeWallpaperScreen" component={HomeWallpaperScreen}></Stack.Screen>
  //       <Stack.Screen name="CollectionScreen" component={CollectionScreen}></Stack.Screen>
  //       <Stack.Screen name="ImageScreen" component={ImageScreen}></Stack.Screen>
  //       <Stack.Screen name="ImageWallpaperScreen" component={ImageWallpaperScreen}></Stack.Screen>
  //       <Stack.Screen name="SearchScreen" component={SearchScreen}></Stack.Screen>
  //       <Stack.Screen name="SearchWallpaperScreen" component={SearchWallpaperScreen}></Stack.Screen>
  //       <Stack.Screen name="LikeScreen" component={LikeScreen}></Stack.Screen>
  //       <Stack.Screen name="LikeWallpaperScreen" component={LikeWallpaperScreen}></Stack.Screen>
  //       <Stack.Screen name="DownloadScreen" component={DownloadScreen}></Stack.Screen>
        
        
  //   </Stack.Navigator>
   
    
     
  // </NavigationContainer>
  )
};