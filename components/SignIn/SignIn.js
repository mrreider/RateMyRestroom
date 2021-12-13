import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Button } from 'react-native';
import {signIn} from '../../apis/api';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required.');
      return
    }

    if (!password) {
      Alert.alert('Password field is required.');
      return
    }

    try {
      signIn(email, password);
    } catch(err) {
      return
    }
    
    navigation.navigate('Loading');
    setEmail('');
    setPassword('');
    
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo_image} source={require("../../assets/logo.png")} />
      
      <StatusBar style="auto" />

      <TextInput
        style={styles.email_underline}
        placeholder="Email"
        placeholderTextColor="#003f5c"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.password_underline}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        value={password}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity style={styles.sign_in_button} onPress={handlePress}>
        <Text style={styles.sign_in_button_text}>SIGN IN</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#DEDEDE',
      alignItems: 'center',
      justifyContent: 'center',
  },

  logo_image: {
    top: "-10%",
    
    height: "30%",
    width: "80%",
    marginBottom: 40,
  },

  email_underline: {
    alignSelf: "stretch",

    top: "-15%",

    marginLeft: "25%",
    marginRight: "25%",

    height: "4%",
    width: "50%",
    marginBottom: "8%",
    
    borderBottomColor: "#B75D69",
    borderBottomWidth: 2,
  },

  password_underline: {
    alignSelf: "stretch",
    
    top: "-15%",
    
    marginLeft: "25%",
    marginRight: "25%",
    
    height: "4%",
    width: "50%",
    
    borderBottomColor: "#B75D69",
    borderBottomWidth: 2,
  },

  forgot_button: {
    height: 30,
    marginBottom: 10,
    bottom: "10%",
    top: "-180%",
  },

  forgot_button_text: {
    flex: 1,
    padding: 10,
    marginLeft: 0,
    color: "#00072D",
  },

  sign_in_button: {
    width: "40%",
    height: 40,
    borderRadius: 25,
    top: "-10%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#774C60",
  },

  sign_in_button_text: {
    fontSize: 17,
    flex: 1,
    padding: 10,
    marginLeft: 0,
    color: "#00072D",
  },

  marker: {
    height:50,
    width: 20
  },
});