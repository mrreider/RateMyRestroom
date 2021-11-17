import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFavorite, loadMarkers } from '../../apis/api';


export default function Map({ navigation }) {

    const [region, setRegion] = useState({
        latitude: 43.07470053372165,
        longitude: -89.38453472496299,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const [fetched, setFetched] = useState(false)

    const [markers, setMarkers] = useState([])

    /**
     * Will prompt the user for permission to fetch their location
     * Will then set the region of the map to their location.
     */

     async function fetchAndSetMarkers() {
        const getMarkers = await loadMarkers()
        const favorite = await getFavorite()
        let newMarkers = []
        for (let i = 0; i < getMarkers.length; i++) {
            const id = "" + getMarkers[i].coordinate.lat + getMarkers[i].coordinate.lng
            const desc = (favorite == id) ? "FAVORITE!\n" + "Rating: " + getMarkers[i].rating + "\n" + getMarkers[i].description : 
            "Rating: " + getMarkers[i].rating + "\n" + getMarkers[i].description
            newMarkers.push({
                latlng: {
                    latitude: getMarkers[i].coordinate.lat,
                    longitude: getMarkers[i].coordinate.lng
                },
                title: getMarkers[i].name,
                description: desc
            })
        }
        setMarkers(newMarkers)
    }

    useEffect(() => {
        if (!fetched) {
            fetchAndSetMarkers()
            setFetched(true)
        }
    })

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

    async function getUserLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return
        }
        let location = await Location.getCurrentPositionAsync()
        const newRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        setRegion(newRegion)
    }

    const findUser = async () => {
        await getUserLocation();
    }

    const reloadMarkers = async () => {
        await fetchAndSetMarkers()
    }


    //Where things are actually shown on screen
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
            >
                {/* Show all Markers using map() */}
                {markers.map((markers, index) => {
                    return <Marker
                        key={index}
                        coordinate={markers.latlng}
                        title={markers.title}
                        description={markers.description}
                        // image = {{uri: Image.resolveAssetSource(icon).uri}}
                        image={require('./icons/toilet.png')}
                    />
                })}
            </MapView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={styles.backText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={findUser}>
                    <Text style={styles.backText}>Locate Me!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={reloadMarkers}>
                    <Text style={styles.backText}>Reload Markers</Text>
                </TouchableOpacity>
            </View>



        </View>

    );

}