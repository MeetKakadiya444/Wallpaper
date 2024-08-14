import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import CollectionScreen from "./screens/CollectionScreen";
import ImageScreen from "./screens/ImageScreen";
 
const Stack= createNativeStackNavigator();

export default function App(){
  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="CollectionScreen1" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen}></Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="CollectionScreen" component={CollectionScreen}></Stack.Screen>
        <Stack.Screen name="ImageScreen" component={ImageScreen}></Stack.Screen>
       
        
    </Stack.Navigator>
   

     
  </NavigationContainer>
  )
};