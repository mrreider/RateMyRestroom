import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function WelcomeScreen ({navigation}) {

    const styles = StyleSheet.create({
        button: {
    
        },
        title: {
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: '50%',
        },
        titleContainer: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inlineText: {
        },
        buttonText: {
            
        },
        background: {
            flex: 1,
            resizeMode: 'cover',
            opacity: .2
        }
      });

  return (
    <View style={styles.titleContainer}>
        {/* <ImageBackground
        style={styles.background}
        source={require('../../assets/badger.png')}> */}
            <Text style={styles.title}>Welcome to Rate My Restroom</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')} >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.inlineText}>Already have an account?</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
      {/* </ImageBackground> */}
    </View>
    
     
      
    //    
    //   
    //   <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
    //     <Text style={styles.buttonText}>Sign In</Text>
    //   </TouchableOpacity>
  )
}