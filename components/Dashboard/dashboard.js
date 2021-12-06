import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Button} from 'react-native';
import {doc, getFirestore, getDoc} from "firebase/firestore";
import { getApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { loggingOut } from '../../apis/api';


export default function Dashboard({ navigation }) {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Get reference to firestore
    app = getApp()
    firestore = getFirestore(app)
    auth = getAuth(app)
    userDoc = doc(firestore, "users", auth.currentUser.uid)

    async function getUserInfo() {
        let user = await getDoc(userDoc)
        if (!user.exists) {
            Alert.alert('User data not found!')
        }
        else {
            let dataObj = user.data()
            setFirstName(dataObj.firstName)
        }
    }

    getUserInfo();
  })

  const handlePress = () => {
    loggingOut();
    navigation.replace('Welcome');
  };

  const handleGoToMap = () => {
    navigation.navigate('Map')
  };

  const handleAddMarker = () => {
    navigation.navigate('Add Marker')
  }

  const handleSelectFavorite = () => {
    navigation.navigate('Select Favorite')
  }

  
  return (
    <View style={styles.container}>
      <Image style={styles.logo_image} source={require("./assets/logo.png")} />

      <Text style={styles.main_title_text}>Dashboard</Text>

      <StatusBar style="auto" />

      <Text style={styles.first_name_text}>Hi {firstName} 🤗</Text>

      <TouchableOpacity style={styles.button_top_left}>
        <Text style={styles.button_top_left_text}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button_top_right}>
        <Text style={styles.button_top_right_text}>Go To Map</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button_bottom_left}>
        <Text style={styles.button_bottom_left_text}>Add New Restroom</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button_bottom_right}>
        <Text style={styles.button_bottom_right_text}>Change Favorite Restroom</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DEDEDE',
      alignItems: 'center',
      justifyContent: 'center'
    },
  
    logo_image: {
      top: "11%",
      right: "-18%",
      
      height: "18%",
      width: "45%",
    },
  
    main_title_text: {
      top: "10%",
  
      fontSize: 32,
      fontWeight: "bold",
      letterSpacing: 3,
  
      color: "#00072D",
    },
   
    first_name_text: {
      top: "11%",
  
      fontSize: 18,
      letterSpacing: 3,
  
      color: "#00072D",
    },
    
    button_top_left: {
      top: "15%",
      left: "-25%",
  
      height: "22%",
      width: "43%",
  
      borderRadius: 10,
      backgroundColor: "#e2b3ca",
    },
    
    button_top_right: {
      top: "-7%",
      right: "-25%",
      
      height: "22%",
      width: "43%",
  
      borderRadius: 10,
      backgroundColor: "#ebc27b",
    },
  
    button_bottom_left: {
      top: "-5%",
      left: "-25%",
  
      height: "22%",
      width: "43%",
  
      borderRadius: 10,
      backgroundColor: "#b6d7a8",
    },
  
    button_bottom_right: {
      top: "-27%",
      right: "-25%",
      
      height: "22%",
      width: "43%",
  
      borderRadius: 10,
      backgroundColor: "#b0cde9",
    },
  
    button_top_left_text: {
      fontSize: 23,
      fontWeight: "bold",
      letterSpacing: 2,
  
      textAlign: 'center',
  
      paddingTop: "40%",
    },
  
    button_top_right_text: {
      fontSize: 23,
      fontWeight: "bold",
      letterSpacing: 2,
  
      textAlign: 'center',
      
      paddingTop: "40%",
    },
  
    button_bottom_left_text: {
      fontSize: 23,
      fontWeight: "bold",
      letterSpacing: 2,
  
      textAlign: 'center',
      
      paddingTop: "30%",
    },
  
    button_bottom_right_text: {
      fontSize: 23,
      fontWeight: "bold",
      letterSpacing: 2,
  
      textAlign: 'center',
      
      paddingTop: "25%",
    },
});