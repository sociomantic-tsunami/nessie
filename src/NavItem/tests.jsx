/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React     from 'react';
import { mount } from 'enzyme';

import NavItem   from './index';


describe( 'NavItemDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NavItem /> );
    } );
} );


describe( 'NavItemDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        const props = {
            label : 'Cthulhu',
        };

        wrapper = mount(  <NavItem { ...props } /> );
        driver = wrapper.driver();
    } );


    test( 'should trigger onClick callback once', () =>
    {
        const onClickSpy = jest.fn().mockReset();
        wrapper.setProps( {
            onClick : onClickSpy,
        } );

        driver.click();

            expect( onClick ).toBeCalledTimes( 1 );
        } );
    } );

    test( 'should trigger onMouseOver callback once', () =>
    {
        const onMouseOverSpy = jest.fn().mockReset();
        wrapper.setProps( {
            onMouseOver : onMouseOverSpy,
        } );

        driver.mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );

    test( 'should trigger onMouseOut callback once', () =>
    {
        const onMouseOutSpy = jest.fn().mockReset();
        wrapper.setProps( {
            onMouseOut : onMouseOutSpy,
        } );

        driver.mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
