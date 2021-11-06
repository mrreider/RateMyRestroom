import React, {Component} from 'react';
import Map from '../Map'
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import toJson from 'enzyme-to-json'

// This configures jest to be able to work with enzyme
configure({adapter: new Adapter()})
// STATE TEST

/**
 * Creates an instance of map, runs addMarker,
 * then checks that the length of the markers list in state
 * has been incremented by one
 */
it('Should change the state of markers, incremented by one', () => {
    const c = shallow(<Map/>)
    const marker =  {
        latlng: {
            latitude: 43.0708751485606,
            longitude:  -89.3986430824941
        },
        title: "Nicholas Recreation Center",
        description: "Pretty nice bathrooms"
    }
    c.instance().addMarker(marker.latlng, marker.title, marker.description)
    expect(c.state('markers').length).toBe(3)
})

/**
 * Runs the onRegionChange function, which changes state
 * to be equal to its given parameter. Checks if
 * state is properly changed
 */
it('Should change the region in state', () => {
    const c = shallow(<Map/>)
    const newRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
    }
    c.instance().onRegionChange(newRegion)
    expect(c.state('region')).toEqual({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
    })
})

/**
 * Snapshot testing of map.
 * Tests from previous snapshots
 */
it ('Should match the previous snapshot', () => {
    const c = shallow(<Map/>)
    expect(toJson(c)).toMatchSnapshot()
})