/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint no-console: 0 */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React          from 'react';
import { mount }      from 'enzyme';

import { InputField } from '../index';


describe( 'InputField', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = mount( <InputField /> );
        instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one InputField', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        let props;

        beforeEach( () =>
        {
            ( { props } = instance );
        } );

        describe( 'defaultValue', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.defaultValue ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { defaultValue: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'defaultValue' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'element', () =>
        {
            test( 'should be "input" by default', () =>
            {
                expect( props.element ).toBe( 'input' );
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { element: 'textarea' } );

                expect( wrapper.prop( 'element' ) ).toBe( 'textarea' );
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.forceHover ).toBeFalsy();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( InputField ).prop( 'forceHover' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.hasError ).toBeFalsy();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( InputField ).prop( 'hasError' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'id', () =>
        {
            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { id: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'id' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.isDisabled ).toBe( false );
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( InputField ).prop( 'isDisabled' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.isReadOnly ).toBeFalsy();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                expect( wrapper.prop( 'isReadOnly' ) ).toBeTruthy();
            } );
        } );

        describe( 'name', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.name ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { name: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'name' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'onBlur', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onBlur ).toBeUndefined();
            } );
        } );

        describe( 'onChange', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onChange ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                const onChange = () => undefined;

                wrapper.setProps( { onChange } );

                expect( wrapper.find( InputField ).prop( 'onChange' ) )
                    .toBe( onChange );
            } );
        } );

        describe( 'onFocus', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onFocus ).toBeUndefined();
            } );
        } );

        describe( 'onKeyPress', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onKeyPress ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                const onKeyPress = () => undefined;

                wrapper.setProps( { onKeyPress } );

                expect( wrapper.find( InputField ).prop( 'onKeyPress' ) )
                    .toBe( onKeyPress );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOut ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( InputField ).prop( 'onMouseOut' ) )
                    .toBe( onMouseOut );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOver ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( InputField ).prop( 'onMouseOver' ) )
                    .toBe( onMouseOver );
            } );
        } );

        describe( 'placeholder', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.placeholder ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { placeholder: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'placeholder' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'textAlign', () =>
        {
            test( 'should be "left" by default', () =>
            {
                expect( props.textAlign ).toBe( 'left' );
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { textAlign: 'right' } );

                expect( wrapper.find( InputField ).prop( 'textAlign' ) )
                    .toBe( 'right' );
            } );
        } );

        describe( 'type', () =>
        {
            test( 'should be "text" by default', () =>
            {
                expect( props.type ).toBe( 'text' );
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { type: 'number' } );

                expect( wrapper.find( InputField ).prop( 'type' ) )
                    .toBe( 'number' );
            } );
        } );

        describe( 'value', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.value ).toBeUndefined();
            } );

            test( 'should be passed to the InputField', () =>
            {
                wrapper.setProps( { value: 'yes!' } );

                expect( wrapper.find( InputField ).prop( 'value' ) )
                    .toBe( 'yes!' );
            } );
        } );
    } );
} );
