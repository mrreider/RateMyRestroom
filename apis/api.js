import {getFirestore, setDoc, doc} from "firebase/firestore";
import { getApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {Alert} from "react-native";
import {initializeApp} from 'firebase/app';
import apiKeys from '../config/keys'


initializeApp(apiKeys.firebaseConfig);
export const app = getApp()
const auth = getAuth(app)
const firestore = getFirestore(app)

export async function getCoordsFromAddress(address) {
  try {
    // const loc = await Location.geocodeAsync("34 Silver Ridge Common", {useGoogleMaps: true})
    const loc = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=34+silver+ridge+common&key=" + apiKeys.googleMapsKey)
    const res = await loc.json()
    if (res.status == "OK") {
      console.log(res)
    }
    else if (res.status == "ZERO_RESULTS"){

    }
    else {
      Alert.alert("Error has occured", res.status)
    }

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