/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React         from 'react';
import { mount }     from 'enzyme';

import { CurrencyInput } from '..';
import { attachEvents } from '../utils';


describe( 'CurrencyInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = mount( <CurrencyInput /> );
        instance = wrapper.instance();
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one CurrencyInput', () =>
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

            test( 'should be passed to the CurrencyInput', () =>
            {
                wrapper.setProps( { defaultValue: 'yes!' } );

                expect( wrapper.find( CurrencyInput ).prop( 'defaultValue' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.forceHover ).toBeFalsy();
            } );

            test( 'should be passed to the CurrencyInput', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( CurrencyInput ).prop( 'forceHover' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.hasError ).toBeFalsy();
            } );

            test( 'should be passed to the CurrencyInput', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( CurrencyInput ).prop( 'hasError' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'id', () =>
        {
            test( 'should be passed to the CurrencyInput', () =>
            {
                wrapper.setProps( { id: 'yes!' } );

                expect( wrapper.find( CurrencyInput ).prop( 'id' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.isDisabled ).toBe( false );
            } );

            test( 'should be passed to the CurrencyInput', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( CurrencyInput ).prop( 'isDisabled' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( props.isReadOnly ).toBeFalsy();
            } );

            test( 'should be passed to the CurrencyInput', () =>
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

            test( 'should be passed to the CurrencyInput', () =>
            {
                wrapper.setProps( { name: 'yes!' } );

                expect( wrapper.find( CurrencyInput ).prop( 'name' ) )
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

            test( 'should be passed to the CurrencyInput', () =>
            {
                const onChange = () => undefined;
                wrapper.setProps( { onChange } );

                expect( wrapper.find( CurrencyInput ).prop( 'onChange' ) )
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

            test( 'should be passed to the CurrencyInput', () =>
            {
                const onKeyPress = () => undefined;
                wrapper.setProps( { onKeyPress } );

                expect( wrapper.find( CurrencyInput ).prop( 'onKeyPress' ) )
                    .toBe( onKeyPress );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOut ).toBeUndefined();
            } );

            test( 'should be passed to the CurrencyInput', () =>
            {
                const onMouseOut = () => undefined;
                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( CurrencyInput ).prop( 'onMouseOut' ) )
                    .toBe( onMouseOut );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.onMouseOver ).toBeUndefined();
            } );

            test( 'should be passed to the CurrencyInput', () =>
            {
                const onMouseOver = () => undefined;
                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( CurrencyInput ).prop( 'onMouseOver' ) )
                    .toBe( onMouseOver );
            } );
        } );

        describe( 'placeholder', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( props.placeholder ).toBeUndefined();
            } );

            test( 'should be passed to the CurrencyInput', () =>
            {
                wrapper.setProps( { placeholder: 'yes!' } );

                expect( wrapper.find( CurrencyInput ).prop( 'placeholder' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'textAlign', () =>
        {
            test( 'should be "left" by default', () =>
            {
                expect( props.textAlign ).toBe( 'left' );
            } );

            test( 'should be passed to the CurrencyInput', () =>
            {
                wrapper.setProps( { textAlign: 'right' } );

                expect( wrapper.find( CurrencyInput ).prop( 'textAlign' ) )
                    .toBe( 'right' );
            } );
        } );

        describe( 'value', () =>
        {
            test( 'should be empty string by default', () =>
            {
                expect( CurrencyInput.defaultProps.value ).toBe( '' );
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { value: 'yes!' } );

                expect( wrapper.find( CurrencyInput ).prop( 'value' ) )
                    .toBe( 'yes!' );
            } );
        } );
    } );
} );


describe( 'CurrencyInputDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <CurrencyInput /> );
        driver  = wrapper.driver();
    } );


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'CurrencyInput cannot simulate blur since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, isDisabled: true } );

                try
                {
                    driver.blur();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should trigger onFocus callback once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'CurrencyInput cannot simulate focus since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, isDisabled: true } );

                try
                {
                    driver.focus();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'change()', () =>
    {
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change();
            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'CurrencyInput cannot simulate change since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isDisabled: true } );

                try
                {
                    driver.change();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'CurrencyInput cannot simulate change since it is read only';
                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isReadOnly: true } );

                try
                {
                    driver.change();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'CurrencyInput cannot simulate click since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick, isDisabled: true } );

                try
                {
                    driver.click();
                }
                catch ( error )
                {
                    expect( onClick ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyPress()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPress();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'CurrencyInput cannot simulate keyPress since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyPress() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress when isDisabled', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( { onKeyPress, isDisabled: true } );

                try
                {
                    driver.keyPress();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyDown()', () =>
    {
        test( 'should trigger onKeyDown callback once', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( { onKeyDown } );

            driver.keyDown();
            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'CurrencyInput cannot simulate keyDown since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyDown() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyDown when isDisabled', () =>
            {
                const onKeyDown = jest.fn();
                wrapper.setProps( { onKeyDown, isDisabled: true } );

                try
                {
                    driver.keyDown();
                }
                catch ( error )
                {
                    expect( onKeyDown ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyUp()', () =>
    {
        test( 'should trigger onKeyUp callback once', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( { onKeyUp } );

            driver.keyUp();
            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'CurrencyInput cannot simulate keyUp since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyUp() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyUp when isDisabled', () =>
            {
                const onKeyUp = jest.fn();
                wrapper.setProps( { onKeyUp, isDisabled: true } );

                try
                {
                    driver.keyUp();
                }
                catch ( error )
                {
                    expect( onKeyUp ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
