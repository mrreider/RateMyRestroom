import React, {useState} from 'react';
import {Image, View, StyleSheet, Text, TextInput, Alert} from 'react-native'
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
          
          
            button_text: {
             
              fontWeight: "bold",
              letterSpacing: 1.5,
          
              color: "#A52A2A",
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
            <Image style={styles.logo_image} source={require("../../assets/logo.png")} />
            <Text style = {styles.main_title_text}>Describe the Restroom</Text>
            
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
                 <Text style = {styles.button_text}>Submit Marker</Text>
             </TouchableOpacity>
        </View>
    )
}