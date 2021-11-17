import { getFirestore, setDoc, getDoc, doc, query, collection, getDocs } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { Alert } from "react-native";
import { initializeApp } from 'firebase/app';
import apiKeys from '../config/keys'


initializeApp(apiKeys.firebaseConfig);
export const app = getApp()
const auth = getAuth(app)
const firestore = getFirestore(app)

export async function loadMarkers() {
  let markerList = []
  col = collection(firestore, "markers")
  try {
    markerSnap = await getDocs(query(col))
    markerSnap.forEach(doc => {
      markerList.push(doc.data())
    })
    return markerList
  } catch (err) {
    Alert.alert("Something went wrong!", err.message)
  }
}

export async function sendMarkerToDatabase(marker) {
  // uid of marker will be a concatentation of the latitude and longitude
  uid = "" + marker.coordinate.lat + marker.coordinate.lng
  document = doc(firestore, "markers", uid)
  try {
    await setDoc(document, {
      coordinate: marker.coordinate,
      name: marker.name,
      rating: marker.rating,
      description: marker.description
    })
    return true
  } catch (err) {
    Alert.alert("There is something wrong!!", err.message)
    return false
  }
}

export async function getCoordsFromAddress(address) {
  try {
    addString = address.trim().replace(" ", "+")
    const loc = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + addString + "&key=" + apiKeys.googleMapsKey)
    const res = await loc.json()
    if (res.status == "OK") {
      return res
    }
    else if (res.status == "ZERO_RESULTS") {
      Alert.alert("Zero results")
      console.log(res)
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