/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React                from 'react';
import { shallow, mount }   from 'enzyme';

import { Fieldset }         from '../index';

describe( 'Fieldset', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Fieldset /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Fieldset', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'hasError', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( Fieldset.defaultProps.hasError ).toBe( false );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( Fieldset.defaultProps.isDisabled ).toBeUndefined();
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( Fieldset.defaultProps.onMouseOut ).toBeUndefined();
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( Fieldset.defaultProps.onMouseOver ).toBeUndefined();
            } );
        } );
    } );
} );


describe( 'FieldsetDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Fieldset /> );
        driver   = wrapper.driver();
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseEnter callback once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseEnter callback once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
