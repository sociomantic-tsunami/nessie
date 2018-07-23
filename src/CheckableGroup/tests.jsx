/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

import React                   from 'react';
import { ReactWrapper, mount } from 'enzyme';

import { Checkbox }            from '../index';

import CheckableGroup          from './index';

describe( 'CheckableGroupDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <CheckableGroup /> );
    } );

    describe( 'getContent()', () =>
    {
        test( 'should return all child nodes', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />
                ],
            } );
            expect( wrapper.driver().getContent() ).toHaveLength( 2 );
        } );

        test( 'should return an array of ReactWrappers', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />
                ],
            } );

            wrapper.driver().getContent().forEach( item =>
                expect( item ).toBeInstanceOf( ReactWrapper ) );
        } );
    } );

    describe( 'selectByIndex()', () =>
    {
        test( 'should set Checkbox at index to checked when uncontrolled', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />
                ],
            } );
            wrapper.driver().selectByIndex( 1 );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeTruthy();
        } );

        test(
            'should set Checkbox at indexes to checked when uncontrolled',
            () =>
            {
                wrapper.setProps( {
                    children : [
                        <Checkbox label = "one" value = "first check" />,
                        <Checkbox label = "two" value = "second check" />,
                        <Checkbox label = "three" value = "third check" />,
                        <Checkbox label = "four" value = "fourth check" />
                    ],
                } );
                wrapper.driver().selectByIndex( [ 1, 3 ] );

                expect( wrapper.driver().getSelectedValues() )
                    .toEqual( [ 'second check', 'fourth check' ] );
            }
        );
    } );
    describe( 'toggleByIndex( index )', () =>
    {
        test( 'should toggle Checkbox with index', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />
                ],
            } );
            wrapper.driver().toggleByIndex( 1 );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeTruthy();

            wrapper.driver().toggleByIndex( 1 );
            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBe( false );
        } );

        test( 'should toggle Checkboxes with indexes', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />,
                    <Checkbox label = "three" value = "third check" />,
                    <Checkbox label = "four" value = "fourth check" />
                ],
            } );
            wrapper.driver().toggleByIndex( [ 1, 3 ] );

            expect( wrapper.driver().getSelectedValues() )
                .toEqual( [ 'second check', 'fourth check' ] );

            wrapper.driver().toggleByIndex( [ 1, 3 ] );

            expect( wrapper.driver().getSelectedValues() ).toEqual( [] );
        } );
    } );

    describe( 'selectByValue()', () =>
    {
        test( 'should set check to Checkbox with value', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />
                ],
            } );

            wrapper.driver().selectByValue( 'second check' );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeTruthy();
        } );

        test( 'should set check to Checkboxes with values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />,
                    <Checkbox label = "three" value = "third check" />,
                    <Checkbox label = "four" value = "fourth check" />
                ],
            } );

            wrapper.driver().selectByValue( [ 'second check', 'third check' ] );

            expect( wrapper.driver().getSelectedValues() )
                .toEqual( [ 'second check', 'third check' ] );
        } );
    } );

    describe( 'toggleByValue( value )', () =>
    {
        test( 'should toggle Checkbox with value', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />
                ],
            } );

            wrapper.driver().toggleByValue( 'second check' );
            const items = wrapper.find( 'li' );

            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBeTruthy();

            wrapper.driver().toggleByValue( 'second check' );
            expect( items.at( 1 ).childAt( 0 ).driver().getChecked() )
                .toBe( false );
        } );

        test( 'should toggle Checkboxes with values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" />,
                    <Checkbox label = "two" value = "second check" />,
                    <Checkbox label = "three" value = "third check" />,
                    <Checkbox label = "four" value = "fourth check" />
                ],
            } );

            wrapper.driver().toggleByValue( [ 'second check', 'third check' ] );

            expect( wrapper.driver().getSelectedValues() )
                .toEqual( [ 'second check', 'third check' ] );

            wrapper.driver().toggleByValue( [ 'second check', 'third check' ] );

            expect( wrapper.driver().getSelectedValues() ).toEqual( [] );
        } );
    } );

    describe( 'getSelectedValues()', () =>
    {
        test( 'should return an array of selected values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" isChecked />,
                    <Checkbox label = "two" value = "second check" />
                ],
            } );

            expect( wrapper.driver().getSelectedValues() )
                .toEqual( [ 'first check' ] );
        } );
    } );


    describe( 'mouseOver', () =>
    {
        test( 'should call onMouseOver exactly once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.simulate( 'mouseenter' );

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut', () =>
    {
        test( 'should call onMouseOut exactly once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.simulate( 'mouseleave' );

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
