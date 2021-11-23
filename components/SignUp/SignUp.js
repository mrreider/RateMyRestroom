import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Button, SafeAreaView, ScrollView, Keyboard } from 'react-native';
import { registration } from '../../apis/api';

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      registration(
        email,
        password,
        lastName,
        firstName,
      );
      navigation.navigate('Loading');
      emptyState();
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo_image} source={require("./assets/logo.png")} />

      <Text style={styles.main_title_text}>Create an Account</Text>

      <StatusBar style="auto" />

      <TextInput
      style={styles.input_underline}
      placeholder="Enter Your First Name *"
      placeholderTextColor="#003f5c"
      value={firstName}
      onChangeText={(name) => setFirstName(name)}
      />
      
      <TextInput
      style={styles.input_underline}
      placeholder="Enter Your Last Name *"
      placeholderTextColor="#003f5c"
      value={lastName}
      onChangeText={(name) => setLastName(name)}
      />

      <TextInput
        style={styles.input_underline}
        placeholder="Enter Your Email *"
        placeholderTextColor="#003f5c"
        value={email}
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
      style={styles.input_underline}
      placeholder="Enter Your Password *"
      placeholderTextColor="#003f5c"
      value={password}
      onChangeText={(password) => setPassword(password)}
      secureTextEntry={true}
      />

      <TextInput
      style={styles.input_underline}
      placeholder="Re-enter Your Password *"
      placeholderTextColor="#003f5c"
      value={confirmPassword}
      onChangeText={(password2) => setConfirmPassword(password2)}
      secureTextEntry={true}
      />

      <TouchableOpacity style={styles.sign_up_button} onPress={handlePress}>
        <Text style={styles.sign_up_button_text}>SIGN UP</Text>
      </TouchableOpacity>

      <Text style={styles.check_have_account_button_text}>Already have an account?</Text>
      <TouchableOpacity style={styles.have_account_button} onPress={() => navigation.navigate('Sign In')}>
        <Text style={styles.have_account_button_text}>SIGN IN</Text>
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
    top: "4%",
    right: "-18%",
    
    height: "18%",
    width: "45%",
    marginBottom: 30,
  },

  main_title_text: {
    top: "1%",

    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 3,

    marginTop: -10,
    marginLeft: 0,
    color: "#00072D",
  },

  input_underline: {
    alignSelf: "stretch",

    top: "6%",

    marginLeft: "22.5%",
    marginRight: "22.5%",

    height: "4%",
    width: "55%",
    marginBottom: "5.5%",
    
    borderBottomColor: "#B75D69",
    borderBottomWidth: 2,
  },

  sign_up_button: {
    top: "8%",
    
    width: "40%",
    height: 40,
    borderRadius: 25,
    
    alignItems: "center",
    justifyContent: "center",
    
    backgroundColor: "#774C60",
  },

  sign_up_button_text: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,

    flex: 1,
    padding: 10,
    marginLeft: 0,

    color: "#00072D",
  },

  check_have_account_button_text: {
    top: "9%",

    fontSize: 16,
    letterSpacing: 1.5,

    flex: 1,
    padding: 10,
    marginLeft: 0,
    marginBottom: 0,

    color: "#00072D",
  },

  have_account_button: {
    top: "-5%",

    flex: 1,
    padding: 10,
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 0
  },

  have_account_button_text: {
    top: "2%",

    flex: 1,
    padding: 10,
    marginLeft: 0,
    marginBottom: 0,

    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,

    color: "#A52A2A",
  },

  marker: {
    height:50,
    width: 20
  },
});