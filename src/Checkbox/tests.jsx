/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

import React              from 'react';
import { shallow, mount } from 'enzyme';

import Checkable          from '../proto/Checkable';

import Checkbox           from './index';

describe( 'Checkbox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Checkbox /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Checkable', () =>
        {
            expect( wrapper.find( Checkable ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'isDisabled', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( Checkable ).prop( 'isDisabled' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( wrapper.prop( 'isReadOnly' ) ).toBe( false );
            } );

            test( 'should be passed to Checkable', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.find( Checkable ).prop( 'onChange' ) )
                    .toBe( onChange );
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Checkable ).prop( 'hasError' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( Checkable ).prop( 'forceHover' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'onChange', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( wrapper.prop( 'onChange' ) ).toBeUndefined();
            } );

            test( 'should be passed to Checkable', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.find( Checkable ).prop( 'onChange' ) )
                    .toBe( onChange );
            } );
        } );
    } );
} );


describe( 'CheckboxDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Checkbox /> );
        driver  = wrapper.driver();
    } );

    describe( 'focus', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            wrapper.find( 'input' ).simulate( 'focus' );

            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'blur', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            wrapper.find( 'input' ).simulate( 'blur' );

            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'setChecked()', () =>
    {
        test( 'should not call onChange when already checked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { isChecked: true, onChange } );

            driver.setChecked();

            expect( onChange ).toBeCalledTimes( 0 );
        } );

        test( 'should call onChange once when unchecked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { isChecked: false, onChange } );

            driver.setChecked();

            expect( onChange ).toBeCalledTimes( 1 );
        } );

        test( 'should set target.checked to true', () =>
        {
            let targetChecked;
            const onChange = jest.fn().mockImplementation( e =>
                targetChecked = e.target.checked );
            wrapper.setProps( { isChecked: false, onChange } );

            driver.setChecked();

            expect( targetChecked ).toBeTruthy();
        } );
    } );


    describe( 'setUnchecked()', () =>
    {
        test( 'should not call onChange when already unchecked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { isChecked: false, onChange } );

            wrapper.driver().setUnchecked();

            expect( onChange ).toBeCalledTimes( 0 );
        } );

        test( 'should call onChange once when checked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { isChecked: true, onChange } );

            driver.setUnchecked();

            expect( onChange ).toBeCalledTimes( 1 );
        } );

        test( 'should set target.checked to false', () =>
        {
            let targetChecked;
            const onChange = jest.fn().mockImplementation( e =>
                targetChecked = e.target.checked );
            wrapper.setProps( { isChecked: true, onChange } );

            driver.setUnchecked();

            expect( targetChecked ).toBeFalsy();
        } );
    } );


    describe( 'toggleChecked()', () =>
    {
        test( 'should call onChange once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.toggleChecked();

            expect( onChange ).toBeCalledTimes( 1 );
        } );

        test( 'should toggle the value of target.checked', () =>
        {
            let targetChecked;
            const onChange = jest.fn().mockImplementation( e =>
                targetChecked = e.target.checked );
            wrapper.setProps( { onChange, isChecked: true } );

            driver.toggleChecked();

            expect( targetChecked ).toBeFalsy();
        } );
    } );


    describe( 'click', () =>
    {
        test( 'should call onClick once', () =>
        {
            const onClick = jest.fn();

            wrapper.setProps( { onClick } );
            wrapper.find( 'input' ).simulate( 'click' );

            expect( onClick ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOver', () =>
    {
        test( 'should call onMouseOver once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.simulate( 'mouseenter' );

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut', () =>
    {
        test( 'should call onMouseOut once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.simulate( 'mouseleave' );

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
