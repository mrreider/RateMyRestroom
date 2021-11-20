import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {doc, getFirestore, getDoc} from "firebase/firestore";
import { getApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { loggingOut } from '../../apis/api';


export default function Dashboard({ navigation }) {
  const [firstName, setFirstName] = useState('');

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker: {
        height:50,
        width: 20
    },
    titleText: {

    },
    button: {

    },
    buttonText: {

    },
    text : {

    }
  });

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
      <Text style={styles.titleText}>Dashboard</Text>
      <Text style={styles.text}>Hi {firstName}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoToMap}>
        <Text style={styles.buttonText}>Go To Map</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddMarker}>
        <Text style={styles.buttonText}>Add New Restroom</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSelectFavorite}>
        <Text style={styles.buttonText}>Change favorite restroom</Text>
      </TouchableOpacity>
    </View>
  )
}