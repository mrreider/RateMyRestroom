import React, {useState, Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import icon from './icons/toilet.png'
import * as Location from 'expo-location';

class Map extends Component {
    state = {
        // Madison Wisconsin starting region
        region: {
            latitude: 43.07470053372165,
            longitude: -89.38453472496299,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        markers: [
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
        ]
    }


    

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
        const newMarkers = [...this.state.markers, newMarker]
        this.setState({markers: newMarkers})
    }

    /**
     * Given a region, changes the state to alter the location the 
     * map is currently viewing
     * @param {*} region - Mutator to change the region of the MapView component
     */
    onRegionChange = (region) => {
        this.setState({region: region})
    }

    /**
     * Will prompt the user for permission to fetch their location
     * Will then set the region of the map to their location.
     */
    componentDidMount() {
       (async () => {
           // Request Permission
           let {status} = await Location.requestForegroundPermissionsAsync();
           
           if (status !== 'granted') {
               return
           }
           // Get location
           let location = await Location.getCurrentPositionAsync()
           const newRegion = {
               latitude: location.coords.latitude,
               longitude: location.coords.longitude,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421
           }
           this.onRegionChange(newRegion)
       })();
    }

    
    //Where things are actually shown on screen
    render () {
        return (
            <MapView
            style = {styles.container}
            region= {this.state.region}
            provider = {PROVIDER_GOOGLE}
            showsUserLocation = {true}
            >
                {/* Show all Markers using map() */}
                {this.state.markers.map((markers, index) => {
                        return <Marker
                        key = {index}
                        coordinate = {markers.latlng}
                        title = {markers.title}
                        description = {markers.description}
                        style = {styles.marker}
                        // image = {{uri: Image.resolveAssetSource(icon).uri}}
                        image = {require('./icons/toilet.png')}
                        />
                })}
            </MapView>
        );
    }
  };

// Style for the map
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject, // Fill screen
      flex: 1
    },
    marker: {
        height:50,
        width: 20
    }
  });

export default Map;