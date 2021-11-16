import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, TextInput, Picker } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getCoordsFromAddress } from '../../apis/api';

export default function AddMarker({navigation}) {
    const [address, setAddress] = useState('')
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState()
    const [items, setItems] = useState()
    const [listOpen, setListOpen] = useState(false)

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
        }
    })

    const submitSearch = async () => {
        let addresses = []
        const res = await getCoordsFromAddress(address)
        for (let i = 0; i < res.results.length; i++) {
            addresses.push({
                label: res.results[i].formatted_address,
                value: res.results[i].geometry.location
            })
        }
        setItems(addresses)
        setListOpen(true)
    }

    // Want to add search box
    return (
        <View style = {styles.container}>
            <Text style = {styles.header}>Add a marker!</Text> 
             <TextInput
             style = {styles.formInput}
             placeholder = "Enter address to add restroom"
             value = {address}
             onChangeText = {(address) => setAddress(address)}
             />
             {listOpen ? 
             <DropDownPicker
                open = {open}
                value = {value}
                items = {items}
                setOpen = {setOpen}
                setValue = {setValue}
                setItems = {setItems}
             /> : null}
             <TouchableOpacity onPress = {submitSearch}>
                 <Text>Search</Text>
             </TouchableOpacity>
        </View>
    );
}