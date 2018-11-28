/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers*/

import React       from 'react';
import { shallow } from 'enzyme';

import Label       from './index';


describe( 'Label', () =>
{
    let wrapper;
    const props = {
        label : 'Boom',
    };
    beforeEach( () =>
    {
        wrapper = shallow( <Label /> );
    } );

    test( 'should contain a single label element', () =>
    {
        expect( wrapper.find( 'label' ) ).toHaveLength( 1 );
    } );
} );


describe( 'LabelDriver', () =>
{
    let wrapper;
    let driver;

    const props = {
        label : 'Tekeli-li',
    };

    beforeEach( () =>
    {
        wrapper = mount( <Label { ...props } /> );
        driver  = wrapper.driver();
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver callback once', () =>
        {
            const onMouseOver = jest.fn();

            wrapper.setProps( { ...props, onMouseOver } );

            driver.mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOver callback once', () =>
        {
            const onMouseOut = jest.fn();

            wrapper.setProps( { ...props, onMouseOut } );

            driver.mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
