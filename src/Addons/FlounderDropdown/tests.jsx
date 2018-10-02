/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import FlounderDropdown   from './index';


describe( 'FlounderDropdown', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <FlounderDropdown /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name FlounderDropdown', () =>
        {
            expect( instance.constructor.name ).toBe( 'FlounderDropdown' );
        } );
    } );
} );


describe( 'FlounderDropdownDriver', () =>
{
    let wrapper;


    const pokemonList = [
        'Option',
        {
            text  : 'Pikachu',
            value : 'pokemon1',
        },
        {
            text  : 'Jigglypuff',
            value : 'pokemon2',
        },
        {
            text  : 'Squirtle',
            value : 'pokemon3',
        },
        {
            text  : 'Balbasaur',
            value : 'pokemon4',
        },
    ];

    beforeEach( () =>
    {
        wrapper = mount( <FlounderDropdown /> );
    } );

    describe( 'chooseItemByIndex( index )', () =>
    {
        test( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByIndex( 0 ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is read-only' );
        } );

        test( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByIndex( 0 ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is disabled' );
        } );
    } );

    describe( 'chooseItemByText( text )', () =>
    {
        test( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByText( 'Pikachu' ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is read-only' );
        } );

        test( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByText( 'Pikachu' ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is disabled' );
        } );
    } );

    describe( 'chooseItemByValues( value )', () =>
    {
        test( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByValue( 'pokemon1' ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is read-only' );
        } );

        test( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().chooseItemByValue( 'pokemon1' ) )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is disabled' );
        } );
    } );

    describe( 'removeAllTags()', () =>
    {
        test( 'should throw error when isReadOnly', () =>
        {
            wrapper.setProps( {
                isReadOnly : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().removeAllTags() )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is read-only' );
        } );

        test( 'should throw error when isDisabled', () =>
        {
            wrapper.setProps( {
                isDisabled : true,
                data       : pokemonList,
            } );

            expect( () => wrapper.driver().removeAllTags() )
                .toThrowError( 'Cannot change the flounder dropdown value \
since it is disabled' );
        } );

        test( 'should throw error when not configured with multipleTags', () =>
        {
            wrapper.setProps( { data: pokemonList } );

            expect( () => wrapper.driver().removeAllTags() )
                .toThrowError( 'Cannot deselect tags when flounder dropdown \
is not configured with multipleTags' );
        } );
    } );
} );