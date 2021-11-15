import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Map from './components/mapview/Map';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {getApp} from "firebase/app"
import { getAuth } from '@firebase/auth';
import Welcome from './components/Welcome/Welcome';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Dashboard from './components/Dashboard/dashboard';

const Stack = createStackNavigator();
export default function App() {
  const app = getApp()
  const auth = getAuth(app)


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'Welcome' component= {Welcome} options = {{headerShown: false, gestureEnabled: false}}/>
        <Stack.Screen name = 'Sign Up' component = {SignUp} options = {{headerShown: false}}/>
        <Stack.Screen name = 'Sign In' component = {SignIn} options = {{headerShown: false}}/>
        <Stack.Screen name= {'Loading'} component={LoadingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name= 'Map' component={Map} options={{ headerShown: true }}/>
        <Stack.Screen name= 'Dashboard' component={Dashboard} options={{ headerShown: false, gestureEnabled: false }}/>
        {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app</Text>
        <StatusBar style="auto" />
        <Map/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}