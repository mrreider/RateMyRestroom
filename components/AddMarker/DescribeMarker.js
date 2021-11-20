import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Alert} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { sendMarkerToDatabase } from '../../apis/api';

export default function DescribeMarker({route, navigation}) {
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')
    const [open, setOpen] = useState(false)

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
            borderColor: '#000',
            borderWidth: 1,
            width: '67%',
            fontFamily: 'Futura',
            backgroundColor: "white"
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
        label: {
            paddingTop: 12
        },
        labelRating: {
            paddingTop: 12,
            paddingBottom: 12
        },
        submitMarker: {
            fontSize: 20,
            color: "#007ad1",
            fontFamily: "Futura"
            
            //fontWeight: 'bold'
        }

    })

    const getItems = () => {
        let tempItems = []
        for (let i = 1; i < 6; i++) {
            tempItems.push({
                label: i,
                value: i
            })
        }
        return tempItems
    }

    const sendAndAddMarker = async () => {
        if (name == '' || rating == 0 || description == '') {
            Alert.alert("Please complete all fields")
            return
        }
        console.log(route.params.location)
        const obToSend = {
            coordinate: route.params.location,
            name: name,
            rating: rating,
            description: description
        }
        const result = await sendMarkerToDatabase(obToSend)
        if (result) {
            Alert.alert("Marker added!")    
        }
        else {
            Alert.alert("There was an error with adding the marker")
        }
        navigation.navigate('Dashboard')
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.header}>Describe the Restroom</Text>
            
            <TextInput
             style = {styles.formInput}
             placeholder = "Enter name of restroom"
             value = {name}
             onChangeText = {(name) => setName(name)}
             />
             
             <DropDownPicker
                style = {styles.dropdown}
                open = {open}
                setOpen = {setOpen}
                items = {getItems()}
                value = {rating}
                setValue = {setRating}
                placeholder = "Please select a rating 1-5"
             />
             
             <TextInput
             style = {styles.formInput}
             placeholder = "Please enter a description"
             value = {description}
             onChangeText = {(description) => setDescription(description)}
             />
             <TouchableOpacity onPress = {sendAndAddMarker}>
                 <Text style = {styles.submitMarker}>Submit Marker</Text>
             </TouchableOpacity>
        </View>
    )
}