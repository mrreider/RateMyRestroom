import React, {useState, Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { Image, View, StyleSheet } from 'react-native';
import icon from './icons/toilet.png'
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
                latlng: {
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
    
    render () {
        return (
            <MapView
            style = {styles.container}
            region= {this.state.region}
            provider = {PROVIDER_GOOGLE}
            showsUserLocation = {true}
            >
                {/* Show all Markers */}
                {this.state.markers.map((markers, index) => {
                        return <Marker
                        key = {index}
                        coordinate = {markers.latlng}
                        title = {markers.title}
                        description = {markers.description}
                        style = {styles.marker}
                        // image = {{uri: Image.resolveAssetSource(icon).uri}}
                        />
                })}
            </MapView>
        );
    }
  };


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1
    },
    marker: {
        height:50,
        width: 20
    }
  });

export default Map;