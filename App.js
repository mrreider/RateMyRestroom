import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/mapview/Map';
import MapView from 'react-native-maps'

class App extends Component {

  render(){
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app</Text>
        <StatusBar style="auto" />
        {/* <Map/> */}
        {/* Uncomment or place the map somewhere else. */}
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App