/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/

import React              from 'react';
import { shallow, mount } from 'enzyme';

import { Tab, TabButton } from '../index';

import Tabs               from './index';


describe( 'Tabs', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Tabs /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should accept a single Tab as children', () =>
        {
            wrapper.setProps( { children: <Tab /> } );
            expect( wrapper.find( TabButton ) ).toHaveLength( 1 );
        } );

        test( 'should accept an array of Tabs as children', () =>
        {
            wrapper.setProps( { children: [ <Tab />, <Tab /> ] } );
            expect( wrapper.find( TabButton ) ).toHaveLength( 2 );
        } );
    } );
} );

describe( 'TabsDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Tabs /> );
        driver   = wrapper.driver();
    } );

    describe( 'getTabButtons()', () =>
    {
        test(
            'should return TabButton instances in Tabs when passed array of \
Tabs as children',
            () =>
            {
                wrapper.setProps( {
                    children : [
                        <Tab label = "Tabity" />,
                        <Tab label = "Taby" />
                    ]
                } );

                expect( driver.getTabButtons() ).toHaveLength( 2 );
            }
        );
    } );

    describe( 'getTabButtonsByIndex()', () =>
    {
        test( 'should return TabButton with given index', () =>
        {
            wrapper.setProps( {
                children : [
                    <Tab label = "Tabity" />,
                    <Tab label = "Taby" />
                ]
            } );

            expect( driver.getTabButtonsByIndex( 1 ).props().label )
                .toBe( 'Taby' );
        } );

        test( 'should return TabButtons when passed indexes as an array', () =>
        {
            wrapper.setProps( {
                children : [
                    <Tab label = "Tabity">Ytibat</Tab>,
                    <Tab label = "Taby">Ybat</Tab>
                ]
            } );

            expect( driver.getTabButtonsByIndex( [ 0, 1 ] ) ).toHaveLength( 2 );
        } );
    } );

    describe( 'getTabButtonsByLabel()', () =>
    {
        test( 'should return TabButton with given label', () =>
        {
            wrapper.setProps( {
                children : [
                    <Tab label = "Tabity" />,
                    <Tab label = "Taby" />
                ]
            } );

            expect( driver.getTabButtonsByLabel( 'Tabity' ).props().label )
                .toBe( 'Tabity' );
        } );
    } );

    describe( 'getTabContent()', () =>
    {
        test( 'should return Tab content', () =>
        {
            wrapper.setProps( {
                children : [
                    <Tab label = "Tabity"><div>Ytibat</div></Tab>,
                    <Tab label = "Taby">Ybat</Tab>
                ]
            } );

            expect( driver.getTabContent() ).toHaveLength( 1 );
        } );
    } );
} );
