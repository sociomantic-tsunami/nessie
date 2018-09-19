/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React            from 'react';
import { shallow }      from 'enzyme';

import { InputField }   from '../index';
import InputContainer   from '../proto/InputContainer';

import TextArea         from './index';


describe( 'TextArea', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextArea /> );
        instance = wrapper.instance();
    } );

    test( 'should be an instance of StatelessComponent', () =>
    {
        expect( instance.constructor.name ).toBe( 'StatelessComponent' );
    } );

    test( 'should contain exactly one InputContainer', () =>
    {
        expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
    } );

    test( 'should contain exactly one InputField', () =>
    {
        expect( wrapper.find( InputField ) ).toHaveLength( 1 );
    } );

    test( 'InputField should have element="textarea"', () =>
    {
        expect( wrapper.find( InputField ).prop( 'element' ) )
            .toBe( 'textarea' );
    } );
} );
