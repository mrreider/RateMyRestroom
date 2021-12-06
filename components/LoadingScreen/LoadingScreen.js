import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {getAuth, onAuthStateChanged, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {getApp} from 'firebase/app'

const app = getApp()
const auth = getAuth(app)

export default function LoadingScreen({ navigation }) {
    useEffect(
        async () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    navigation.replace('Dashboard')
                }
                else {
                    navigation.replace('Welcome')
                }
            })
        }
    )

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }
      });

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' />
        </View>
    )
}