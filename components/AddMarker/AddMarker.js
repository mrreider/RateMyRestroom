import { signInWithCustomToken } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Text, TextInput, Picker, Alert } from 'react-native';
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
          top: "1%",
      
          fontSize: 32,
          fontWeight: "bold",
          letterSpacing: 3,
      
          marginTop: 0,
          marginLeft: 0,
          color: "#00072D",
        },
      
      
        search_button: {
          top: "8%",
          
          width: "100%",
          height: 40,
          borderRadius: 40,
          
          alignItems: "center",
          justifyContent: "center",
          
          backgroundColor: "#774C60",
        },
      
        search_button_text: {
          fontSize: 18,
          fontWeight: "bold",
          letterSpacing: 2,
          
      
          flex: 1,
          padding: 10,
          marginLeft: 0,
      
          color: "#00072D",
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
            <Image style={styles.logo_image} source={require("../../assets/logo.png")} />
            <Text style={styles.main_title_text}>Add a Restroom</Text>
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
            <TouchableOpacity style={styles.search_button} onPress={submitSearch}>
                <Text style={styles.search_button_text}>Search</Text>
            </TouchableOpacity>
            {value == null ? null :
                <TouchableOpacity onPress={submitValidAddress}>
                    <Text style={styles.button2}>Add Marker</Text>
                </TouchableOpacity>
            }
        </View>
    );
}