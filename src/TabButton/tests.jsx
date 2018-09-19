/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */

import React            from 'react';
import { mount }        from 'enzyme';

import { TabButton }    from '../index';

describe( 'TabButton', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <TabButton /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should render exactly one TabButton', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );
} );

describe( 'TabButton Driver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <TabButton /> );
        driver   = wrapper.driver();
    } );

    describe( 'click()', () =>
    {
        test( 'should trigger onClick', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( {
                onClick
            } );

            driver.click();

            expect( onClick ).toBeCalled();
        } );

        test( 'should return error if disabled', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( {
                onClick,
                isDisabled : true
            } );

            expect( () => driver.click() ).toThrowError( 'Button cannot be \
clicked because it is disabled' );
        } );
    } );
} );
