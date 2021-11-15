import {getFirestore, setDoc, doc} from "firebase/firestore";
import { getApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {Alert} from "react-native";
import {initializeApp} from 'firebase/app';
import apiKeys from '../config/keys'
import * as Location from 'expo-location'


initializeApp(apiKeys.firebaseConfig);
export const app = getApp()
const auth = getAuth(app)
const firestore = getFirestore(app)
Location.setGoogleApiKey("AIzaSyAm23sJcn7EuK-maawqFysYe0RrMsagawo")


export async function getCoordsFromAddress(address) {
  try {
    const test = await Location.geocodeAsync("34 Silver Ridge Common", {useGoogleMaps: true})
    console.log(test)
  }
  catch (err) {
    console.log(err)
    Alert.alert("There is something wrong", err.message)
  }
}

export async function registration(email, password, lastName, firstName) {
  try {
    // Create the user
    await createUserWithEmailAndPassword(auth, email, password);

    // Update user database
    const currentUser = auth.currentUser
    await setDoc(doc(firestore, "users", currentUser.uid), {
        email: currentUser.email,
        lastName: lastName,
        firstName: firstName,
    })
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password)

  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await signOut(auth)
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}