import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Map from './components/mapview/Map';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './components/Welcome/Welcome';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Dashboard from './components/Dashboard/dashboard';
import AddMarker from './components/AddMarker/AddMarker';
import DescribeMarker from './components/AddMarker/DescribeMarker';

const Stack = createStackNavigator();
export default function App() {


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
        <Stack.Screen name= 'Map' component={Map} options={{ headerShown: false }}/>
        <Stack.Screen name= 'Dashboard' component={Dashboard} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name= 'Add Marker' component={AddMarker} options={{ headerShown: false}}/>
        <Stack.Screen name= 'Describe Marker' component={DescribeMarker} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}