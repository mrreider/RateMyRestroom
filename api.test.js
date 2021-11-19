import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FirebaseError } from '@firebase/util';
import * as API from '../../apis/api'
import * as path from "path"
import {functions} from "firebase-functions-test"
import { getAuth } from '@firebase/auth';
import { doc, getDoc, getFirestore } from '@firebase/firestore';

Enzyme.configure({ adapter: new Adapter() })

// Test sign into test account

describe("Tests for API with test account", () => {

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
})