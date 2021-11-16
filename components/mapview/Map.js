import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { View, StyleSheet, Text } from 'react-native';
import icon from './icons/toilet.png'
import * as Location from 'expo-location';
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Map({navigation}) {

    const [region, setRegion] = useState({
        latitude: 43.07470053372165,
        longitude: -89.38453472496299,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421})
    
    const [markers, setMarkers] = useState([
        {
            latlng: { // AKA coordinate
                latitude: 43.0708751485606,
                longitude:  -89.3986430824941
            },
            title: "Nicholas Recreation Center",
            description: "Pretty nice bathrooms"
        },
        {
            latlng: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            title: "test",
            description: "a test marker"
        }
    ])

    /**
     * Function to be called to add marker to the map
     * Will be called in a loop from ComponentDidMount
     * 
     * @param {*} coordinate - An object containing latitude and longitudinal coordinates
     * @param {*} title - A string title describing the marker
     * @param {*} description - A string description of the marker.
     */
     addMarker = (coordinate, title, description) => {
        
        const newMarker = {
            coordinate: coordinate,
            title: title,
            description: description
        }
        const newMarkers = [...markers, newMarker]
        setMarkers(newMarkers)
    }

    /**
     * Given a region, changes the state to alter the location the 
     * map is currently viewing
     * @param {*} region - Mutator to change the region of the MapView component
     */
    onRegionChange = (region) => {
        setRegion(region)
    }

    /**
     * Will prompt the user for permission to fetch their location
     * Will then set the region of the map to their location.
     */

    // useEffect(() => {
    //     async function getUserLocation() {
    //         let {status} = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             return
    //         }
    //         let location = await Location.getCurrentPositionAsync()
    //         const newRegion = {
    //            latitude: location.coords.latitude,
    //            longitude: location.coords.longitude,
    //            latitudeDelta: 0.0922,
    //            longitudeDelta: 0.0421
    //        }
    //        setRegion(newRegion)
    //     }

    //     getUserLocation()
    // })
    
// Style for the map
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    footer: {
        margin: 10,
        marginBottom: 37
    },
    backText: {
        fontSize: 20,
        textAlign: 'center',
    },
    map: {
        flex: 1
    }
  });

  const handleBack = () => {
      navigation.replace('Dashboard')
  }

  const test = () => {
    getCoordsFromAddress("turkey")
  }
    
    //Where things are actually shown on screen
        return (
            <View style = {styles.container}>
                <MapView
                    style = {styles.map}
                    region= {region}
                    provider = {PROVIDER_GOOGLE}
                    showsUserLocation = {true}
                >
                    {/* Show all Markers using map() */}
                    {markers.map((markers, index) => {
                            return <Marker
                            key = {index}
                            coordinate = {markers.latlng}
                            title = {markers.title}
                            description = {markers.description}
                            // image = {{uri: Image.resolveAssetSource(icon).uri}}
                            image = {require('./icons/toilet.png')}
                            />
                })}
                </MapView>
                <View style = {styles.footer}>
                    <TouchableOpacity onPress = {handleBack}>
                        <Text style = {styles.backText}>Dashboard</Text>
                    </TouchableOpacity>
                </View>
                
                
                
            </View>
            
        );

}