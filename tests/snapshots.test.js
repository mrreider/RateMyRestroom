import React, {Component} from 'react';
import Map from '../components/mapview/Map'
import AddMarker from '../components/AddMarker/AddMarker'
import Welcome from '../components/Welcome/Welcome';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import Dashboard from '../components/Dashboard/dashboard';
import DescribeMarker from '../components/AddMarker/DescribeMarker';
import SelectFavorite from '../components/SelectFavorite/SelectFavorite';

import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import toJson from 'enzyme-to-json'

// This configures jest to be able to work with enzyme
configure({adapter: new Adapter()})

/**
 * Snapshot testing.
 * Tests from previous snapshots
 */
 it('SelectFavorite snapshot should match the previous snapshot', () => {
    const c = shallow(<SelectFavorite/>)
    expect(toJson(c)).toMatchSnapshot()
})

 it('Dashboard snapshot should match the previous snapshot', () => {
    const c = shallow(<Dashboard/>)
    expect(toJson(c)).toMatchSnapshot()
})

 it('LoadingScreen snapshot should match the previous snapshot', () => {
    const c = shallow(<LoadingScreen/>)
    expect(toJson(c)).toMatchSnapshot()
})

it ('Map snapshot should match the previous snapshot', () => {
    const c = shallow(<Map/>)
    expect(toJson(c)).toMatchSnapshot()
})

it('AddMarker snapshot should match the previous snapshot', () => {
    const c = shallow(<AddMarker/>)
    expect(toJson(c)).toMatchSnapshot()
})

it('DescribeMarker snapshot should match the previous snapshot', () => {
    const c = shallow(<DescribeMarker/>)
    expect(toJson(c)).toMatchSnapshot()
})

it('Welcome snapshot should match the previous snapshot', () => {
    const c = shallow(<Welcome/>)
    expect(toJson(c)).toMatchSnapshot()
})

it('SignUp snapshot should match the previous snapshot', () => {
    const c = shallow(<SignUp/>)
    expect(toJson(c)).toMatchSnapshot()
})

it('SignIn snapshot should match the previous snapshot', () => {
    const c = shallow(<SignIn/>)
    expect(toJson(c)).toMatchSnapshot()
})


