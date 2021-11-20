import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FirebaseError } from '@firebase/util';
import * as API from '../apis/api'
import * as path from "path"
import {functions} from "firebase-functions-test"
import { getAuth, onAuthStateChanged, deleteUser } from '@firebase/auth';
import { doc, getDoc, getFirestore, deleteDoc } from '@firebase/firestore';
import { fail } from 'assert';

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


}) 
