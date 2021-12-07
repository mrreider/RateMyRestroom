import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
 
export default function WelcomeScreen ({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo_image} source={require("./assets/logo.png")} />

      <Text style={styles.main_title_text}>👋 WELCOME 👋</Text>

      <StatusBar style="auto" />
      
      <Text style={styles.sign_up_text}>New User?</Text>

      <TouchableOpacity style={styles.sign_up_button} onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.sign_up_button_text}>SIGN UP</Text>
      </TouchableOpacity>

      <Text style={styles.sign_in_text}>Existing User?</Text>

      <TouchableOpacity style={styles.sign_in_button} onPress={() => navigation.navigate('Sign In')}>
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
    justifyContent: 'center'
  },

  logo_image: {
    top: "-9%",
    
    height: "32%",
    width: "78%",
    marginBottom: 40,
  },

  main_title_text: {
    top: "-21.5%",

    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 8,

    textAlign: 'center',

    color: "#07205B",
  },

  sign_up_text: {
    top: "-14%",

    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 4,

    textAlign: 'center',

    color: "#90251C",
  },

  sign_up_button: {
    top: "-12.5%",

    width: "45%",
    height: "5%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#774C60",
  },

  sign_up_button_text: {
    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 3,

    textAlign: 'center',

    color: "#00072D",
  },

  sign_in_text: {
    top: "-6.5%",

    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 4,

    color: "#90251C",
  },

  sign_in_button: {
    top: "-5%",

    width: "45%",
    height: "5%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#774C60",
  },

  sign_in_button_text: {
    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 3,

    textAlign: 'center',

    color: "#00072D",
  },
});