import {withHooks} from 'jest-react-hooks-shallow'
import Adapter from 'enzyme-adapter-react-16';
import * as API from '../apis/api'
import Enzyme, {shallow} from 'enzyme';
import React from 'react'
import {StyleSheet} from 'react-native'
// import { getAuth, onAuthStateChanged, deleteUser } from '@firebase/auth';
// import { doc, getDoc, getFirestore, deleteDoc } from '@firebase/firestore';
import SelectFavorite from '../components/SelectFavorite/SelectFavorite'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import Map from '../components/mapview/Map'

Enzyme.configure({ adapter: new Adapter() })

describe("hooks tests", () => {
    test("select favorite useeffect", () => {
        withHooks(() => {
            jest.spyOn(API, "loadMarkers").mockImplementation( () => {
                return [{
                    coordinate: {
                        lat:0,
                        lng:0
                    },
                    name: "test"
                }]
            })
            c = shallow(<SelectFavorite/>)
        })
        
    })

    test("loadingscreen useeffect", () => {
        withHooks(() => {
            // jest.spyOn(Auth, "onAuthStateChanged").mockImplementation(async () => true)
            c = shallow(<LoadingScreen/>)
        })
        
    })

    test("map useeffect", () => {
        withHooks(() => {
            jest.spyOn(API, "loadMarkers").mockImplementation(async () => [])
            jest.spyOn(API, "getFavorite").mockImplementation(async () => null)
            c = shallow(<Map/>)
        })
    })
})


   
