/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';


import Dropdown     from './index';

describe( 'Dropdown', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Dropdown /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );

    describe( 'Wrapper driver getContent', () =>
    {
        test( 'should return the dropdown content', () =>
        {
            wrapper = mount( <Dropdown><p>Lightning Strike</p></Dropdown> );

            const content = wrapper.driver().getContent();
            expect( content.find( 'p' ).text() ).toBe( 'Lightning Strike' );
        } );
    } );
} );
