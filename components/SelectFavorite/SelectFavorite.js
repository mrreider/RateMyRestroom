import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadMarkers } from '../../apis/api';

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
                    uid = "" + getMarkers[i].coordinate.lat + getMarkers[i].coordinate.lng
                    newItems.push({
                        label: getMarkers[i].name,
                        value: uid
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
            backgroundColor: '#fff',
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
            fontWeight: 'bold'
        },
        dropdown: {
            width: '67%',
            justifyContent: 'center',
            marginStart: '16.4%'
        },
        label: {
            paddingTop: 12
        },
        labelRating: {
            paddingTop: 12,
            paddingBottom: 12
        },
        submitMarker: {
            fontSize: 24,
            fontWeight: 'bold',
            borderWidth: 1
        }

    })


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select your favorite restroom</Text>
            <DropDownPicker
                style={styles.dropdown}
                open={open}
                setOpen={setOpen}
                items={items}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select favorite restroom"
            />
            <TouchableOpacity>
                <Text>Select</Text>
            </TouchableOpacity>
        </View>
    )
}
