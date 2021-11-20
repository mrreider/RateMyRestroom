import { signInWithCustomToken } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Picker, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getCoordsFromAddress } from '../../apis/api';

export default function AddMarker({ navigation }) {
    const [address, setAddress] = useState('')
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState()
    const [listOpen, setListOpen] = useState(false)

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
            backgroundColor: '#fff',
            borderWidth: 1,
            width: '67%',
            fontFamily: 'Futura',
            paddingLeft: 10,
            
            
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
            //fontWeight: 'bold',
            fontFamily: 'Futura',
            color: "#007ad1",
            height: 100,
            marginTop: 0,
            marginBottom: 10
        }

    })

    const submitSearch = async () => {
        
        let addresses = []
        try {
            if (address == '') {
                Alert.alert("Please enter an address")
                return
            }
            const res = await getCoordsFromAddress(address)
            for (let i = 0; i < res.results.length; i++) {
                addresses.push({
                    label: res.results[i].formatted_address,
                    value: res.results[i].geometry.location
                })
            }
            setItems(addresses)
            setListOpen(true)
        } catch (err) {
            Alert.alert("Something went wrong", err.message)
        }
        
    }

    const submitValidAddress = () => {
        console.log(value)
        if (value == null) {
            Alert.alert("Please select an address!")
            return
        }
        navigation.navigate('Describe Marker', {
            location: value
        })
    }

    // Want to add search box
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add a Restroom</Text>
            <TextInput
                style={styles.formInput}
                placeholder="Enter address to add restroom"
                value={address}
                onChangeText={(address) => setAddress(address)}
            />
            {listOpen ?
                <DropDownPicker style={styles.dropDown}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                /> : null}
            <TouchableOpacity onPress={submitSearch}>
                <Text style={styles.button1}>Search</Text>
            </TouchableOpacity>
            {value == null ? null :
                <TouchableOpacity onPress={submitValidAddress}>
                    <Text style={styles.button2}>Add Marker</Text>
                </TouchableOpacity>
            }
        </View>
    );
}