import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Text, Alert } from 'react-native'
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
                // console.log(getMarkers)
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
                Alert.alert("something went wrong", err.message)
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
            backgroundColor: '#d4302a',
            alignItems: 'center',
            justifyContent: 'center',
        },
        formInput: {
            margin: 15,
            height: 40,
            borderColor: '#7a42f4',
            borderWidth: 1,
            width: '67%'
        },
        header: {
            fontSize: 25,
            fontFamily: 'Futura',
            fontWeight: 'bold',
            color: "white",
            marginBottom: 100
        },
        dropdown: {
            width: '67%',
            justifyContent: 'center',
            marginStart: '16.4%'
        },
        submit: {
            fontSize: 30,
            //fontWeight: 'bold',
            marginTop: 30,
        },
        submitText: {
            fontSize: 15,
            //fontWeight: 'bold',
            fontFamily: "Futura",
            color: "#007ad1"
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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Favorite Restroom</Text>
            <DropDownPicker
                style={styles.dropdown}
                open={open}
                setOpen={setOpen}
                items={items}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select favorite restroom"
            />
            <TouchableOpacity style = {styles.submit} onPress = {submitFavorite}>
                <Text style = {styles.submitText}>Select as favorite</Text>
            </TouchableOpacity>
        </View>
    )
}
