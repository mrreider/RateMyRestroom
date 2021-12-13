import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FirebaseError } from '@firebase/util';
import * as API from '../apis/api'
import * as path from "path"
import {functions} from "firebase-functions-test"
import { getAuth, onAuthStateChanged, deleteUser } from '@firebase/auth';
import { doc, getDoc, getFirestore, deleteDoc } from '@firebase/firestore';
import { fail } from 'assert';
import Map, {fetchAndSetMarkers, getUserLocation}  from '../components/mapview/Map';
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'
import * as Location from 'expo-location';
// import * as Authentication from "firebase/auth"
import * as FireStore from 'firebase/firestore'
import Dashboard from '../components/Dashboard/dashboard'
import WelcomeScreen from '../components/Welcome/Welcome'
import {withHooks} from 'jest-react-hooks-shallow'
// import enableHooks from 'jest-react-hooks-shallow';
import SelectFavorite from '../components/SelectFavorite/SelectFavorite'
import AddMarker from '../components/AddMarker/AddMarker'
import DescribeMarker from '../components/AddMarker/DescribeMarker';
import { Alert } from 'react-native';

Enzyme.configure({ adapter: new Adapter() })

// Test sign into test account

describe("Tests for API with test account", () => {

    test("test registration then delete user", async () => {

        const auth = getAuth(API.app)
        try{
            await API.registration("test1@test.com", "Tester2468", "test", "test")
            let exist = false
            onAuthStateChanged(auth, (user) => {
                if (user) exist = true
                expect(exist).toBe(true)
            })
            document = doc(getFirestore(API.app), "users", auth.currentUser.uid)
            const user = await getDoc(document)
            const result = user.exists()
            expect(result).toBe(true)
        } catch (err) {
            console.log(err.message)
            fail('should not reach here')
        }
        finally {
            //teardown
            await deleteDoc(document)
            await deleteUser(auth.currentUser)
        }
        
        
    })

    test("Log in as test user", async () => {
        await API.signIn("test@test.com", "Tester123")
        const auth = getAuth(API.app)
        // Make sure user exists
        expect(auth.currentUser).not.toBe(null)
        
        // Make sure user is in database
        document = doc(getFirestore(API.app), "users", auth.currentUser.uid)
        let user = await getDoc(document)
        expect(user.exists()).toBe(true)
    })

    test("get coordinates from address", async () => {
        try {
            const result = await API.getCoordsFromAddress("34 silver ridge common")
            expect(result).not.toBe(null)
        } catch (err) {
            console.log(err.message)
            fail('should not reach here')
        }
    })

    test('marker send to database', async () => {
        const marker = {
            coordinate: {
                lat: 0,
                lng: 0
            },
            name: "testMarker",
            rating: -1,
            description: "a test marker, should not exist for long"
        }
        try {
            const result = await API.sendMarkerToDatabase(marker)
            expect(result).toBe(true) 
        }
        catch (err) {
            console.log(err.message)
            fail('should not reach here')
        }
        finally {
            // teardown
            uid = "" + marker.coordinate.lat + marker.coordinate.lng
            document = doc(getFirestore(API.app), "markers", uid)
            await deleteDoc(document)
        }

    })

    test('loadMarkers', async () => {
        try {
            const result = await API.loadMarkers()
        } catch(err) {
            console.log(err.message)
            fail('code should not reach here')
        }
    })


    test('set favorite and getfavorite', async () => {
        const firestore = getFirestore(API.app)
        const auth = getAuth(API.app)
        try {
            const random = Math.floor(Math.random() * 1000)
            const result = await API.setFavorite(String(random))
            expect(result).toBe(true)
            // document = doc(firestore, "users", auth.currentUser.uid)
            // userData = (await getDoc(document)).data()
            const favResult = await API.getFavorite()
            expect(favResult).toBe(String(random))
        } catch (err) {
            console.log(err.message)
            fail('code should not reach here')
        }

    })

    test('inner api of mapview, fetchAndSetMarkers 1', async () => {
        jest.spyOn(API, "getFavorite").mockImplementation(() => "")
        jest.spyOn(API, "loadMarkers").mockImplementation(() => {
            return [
                {coordinate: {
                    latitude: 0,
                    longitude: 0
                },
                name: "test",
                rating: "test",
                description: "test"
            }]
        })
        c = shallow(<Map/>)
        await c.find('TouchableOpacity').at(2).props().onPress()
        // Check for marker children
        expect(c.find('MapView').props().children.length).not.toBe(0)
    })

    test('inner api of mapview 1, getUserLocation', async () => {
        jest.spyOn(Location, "requestForegroundPermissionsAsync").mockImplementation(async () => {
            return {status: "granted"}
        })
        jest.spyOn(Location, "getCurrentPositionAsync").mockImplementation(() => {
            return {
                coords: {
                    latitude: 0,
                    longitude: 0
                }
            }
        })

        c = shallow(<Map/>)
        await c.find('TouchableOpacity').at(1).props().onPress()
    })

    test('inner api of mapview 2, getUserLocation', async () => {
        jest.spyOn(Location, "requestForegroundPermissionsAsync").mockImplementation(() => "")

        c = shallow(<Map/>)
        await c.find('TouchableOpacity').at(1).props().onPress()
    })

    test('inner api of mapview, handleback', async () => {
        c = shallow(<Map
            navigation={{
                replace: jest.fn()
            }}
        />)
        c.find('TouchableOpacity').at(0).props().onPress()
    })


    test('inner api of SignIn', () => {
        jest.spyOn(API, "signIn").mockImplementation(() => false)
        c = shallow(<SignIn 
        navigation = {{
            navigate: jest.fn()
        }}
        />)
        c.find('View').children().at(4).props().onPress()
        c.find('View').children().at(2).props().onChangeText("test@test.com")
        c.find('View').children().at(3).props().onChangeText("Tester123")
        c.find('View').children().at(4).props().onPress()
    })

    test('inner api of Signup', () => {
        jest.spyOn(API, "registration" ).mockImplementation(() => false)
        c = shallow(<SignUp 
            navigation = {{
                navigate: jest.fn()
            }}/>)
        c.find('View').children().at(8).props().onPress()
        c.find('View').children().at(3).props().onChangeText("a")
        c.find('View').children().at(4).props().onChangeText("b")
        c.find('View').children().at(8).props().onPress()
        c.find('View').children().at(5).props().onChangeText("test@test.com")
        c.find('View').children().at(8).props().onPress()
        c.find('View').children().at(6).props().onChangeText("Tester123")
        c.find('View').children().at(8).props().onPress()
        c.find('View').children().at(6).props().onChangeText("Tester123")
        c.find('View').children().at(7).props().onChangeText("Test")
        c.find('View').children().at(8).props().onPress()
        c.find('View').children().at(7).props().onChangeText("Tester123")
        c.find('View').children().at(8).props().onPress()
        c.find('View').children().at(10).props().onPress()
    })

    // Must have user obj
    test('inner api of dashboard 1', () => {
        // withHooks(() => {
            c = shallow(<Dashboard
                navigation = {{
                    navigate: jest.fn(),
                    replace: jest.fn()
                }}
            />)
            c.find('View').children().at(4).props().onPress()
            c.find('View').children().at(5).props().onPress()
            c.find('View').children().at(6).props().onPress()
            c.find('View').children().at(7).props().onPress()
        // })
        

    })


    test('inner api of Signup', () => {
        c = shallow(<WelcomeScreen 
            navigation = {{
                navigate: jest.fn()
            }}/>)
        c.find('View').children().at(4).props().onPress()
        c.find('View').children().at(6).props().onPress()
    })

    test('inner api of select favorite 1', async () => {
        jest.spyOn(API, "setFavorite").mockImplementation(val => true)
        jest.spyOn(API, "loadMarkers").mockImplementation(() => {
            return [{
                coordinate: {
                    lat: 0,
                    lng: 0
                },
                name: "test"
            }]
        })
        // withHooks(async () => {
            c = shallow(<SelectFavorite 
                navigation = {{
                    navigate: jest.fn()
                }}/>)
            await c.find('View').children().at(2).props().onPress()
            c.find('View').children().at(1).props().setOpen(true)
            c.find('View').children().at(1).props().setValue(1)
            c.find('View').children().at(1).props().setItems([])
            await c.find('View').children().at(2).props().onPress()
        // })
        
    })

    test('inner api of select favorite 2', async () => {
        jest.spyOn(API, "setFavorite").mockImplementation(val => false)
        jest.spyOn(Alert, "alert").mockImplementation(val => true)
        jest.spyOn(API, "loadMarkers").mockImplementation(() => {
            return [{
                coordinate: {
                    lat: 0,
                    lng: 0
                },
                name: "test"
            }]
        })
        // withHooks(async () => {
            c = shallow(<SelectFavorite 
                navigation = {{
                    navigate: jest.fn()
                }}/>)
            c.find('View').children().at(1).props().setOpen(true)
            c.find('View').children().at(1).props().setValue(1)
            c.find('View').children().at(1).props().setItems([])
            await c.find('View').children().at(2).props().onPress()
        // })
        
    })

    test('inner api of add marker', async () => {
        jest.spyOn(API, "getCoordsFromAddress").mockImplementation(val => {
            return {
                results: [
                    {
                        formatted_address: 'test',
                        geometry: {
                            location: 0
                        }
                    }
                ]
            }
        })
        c = shallow(<AddMarker
            navigation = {{
                navigate: jest.fn()
            }}
        />)
        c.find('View').children().at(1).props().onChangeText("fakeAddress")
        await c.find('View').children().at(2).props().onPress()
        c.find('View').children().at(2).props().setValue(0)
        c.find('View').children().at(4).props().onPress()
    })

    test('inner api of describe marker 1', async () => {
        jest.spyOn(API, "sendMarkerToDatabase").mockImplementation(val => true)
        c = shallow(<DescribeMarker
            navigation = {{
                navigate: jest.fn()
            }}
            route = {{
                params: {
                    location: 0
                }
            }}
        />)
        await c.find('View').children().at(4).props().onPress()
        c.find('View').children().at(1).props().onChangeText("name")
        c.find('View').children().at(2).props().items
        c.find('View').children().at(2).props().setValue(3)
        c.find('View').children().at(3).props().onChangeText("Desc")
        await c.find('View').children().at(4).props().onPress()
    })

    test('inner api of describe marker 2', async () => {
        jest.spyOn(API, "sendMarkerToDatabase").mockImplementation(val => false)
        c = shallow(<DescribeMarker
            navigation = {{
                navigate: jest.fn()
            }}
            route = {{
                params: {
                    location: 0
                }
            }}
        />)
        c.find('View').children().at(1).props().onChangeText("name")
        c.find('View').children().at(2).props().items
        c.find('View').children().at(2).props().setValue(3)
        c.find('View').children().at(3).props().onChangeText("Desc")
        await c.find('View').children().at(4).props().onPress()
    })




}) 

