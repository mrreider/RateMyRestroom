import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Image, View, StyleSheet, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadMarkers, setFavorite } from '../../apis/api';

export default function SelectFavorite({ navigation }) {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([])
    const [value, setValue] = useState(null)
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        async function fetchMarkersGetList() {
            try {
                const getMarkers = await loadMarkers()
                let newItems = []
                for (let i = 0; i < getMarkers.length; i++) {
                    id = "" + getMarkers[i].coordinate.lat + getMarkers[i].coordinate.lng
                    newItems.push({
                        label: getMarkers[i].name,
                        value: id
                    })
                }
                setItems(newItems)
            }
            catch (err) {
            }
            
        }
        if (!fetched) {
            fetchMarkersGetList()
            setFetched(true)
        }
    })

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#DEDEDE',
            alignItems: 'center',
            justifyContent: 'center'
        },
      
        logo_image: {
          top: "-9%",
          
          height: "32%",
          width: "90%",
          marginBottom: 40,
        },
      
        main_title_text: {
          top: "-10%",
      
          fontSize: 23,
          fontWeight: "bold",
          letterSpacing: 3,
      
          marginTop: 0,
          marginLeft: 0,
          color: "#00072D",
        },
        dropDown: {  
            fontFamily: 'Futura'      
        },
        header: {
            marginTop: 10,
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'Futura',
            color: "white",
            height: 100
        },
        button1: {
            fontSize: 20,
            //fontWeight: 'bold',
            fontFamily: 'Futura',
            color: "#007ad1",
            height: 50,
            marginTop: 50,
            marginBottom: 0
        },
        button2: {
            fontSize: 20,
            fontWeight: 'bold',
            color: "#007ad1",
            height: 100,
            marginTop: 0,
            marginBottom: 10,
            color: "#00072D"
        }

    })

    const submitFavorite = async () => {
        if (value == null){
            Alert.alert("Please select an option")
            return
        }
        const success = await setFavorite(value)
        if (success) {
            Alert.alert("Favorite set!")
        }
        else {
            Alert.alert("Something went wrong with setting favorite")
        }
        navigation.navigate('Dashboard')
    }

    const getLabelFromVal = (val) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].value == val)
                return items[i].label 
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo_image} source={require("../../assets/logo.png")} />
            <Text style={styles.main_title_text}>Favorite Restroom</Text>
            <DropDownPicker
                style={styles.dropDown}
                open={open}
                setOpen={setOpen}
                items={items}
                setValue={setValue}
                setItems={setItems}
                placeholder= {value == null ? "Select favorite restroom" : getLabelFromVal(value)} 
            />
            <TouchableOpacity style = {styles.submit} onPress = {submitFavorite}>
                <Text style = {styles.button2}>Select as favorite</Text>
            </TouchableOpacity>
        </View>
    )
}
