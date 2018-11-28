/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers */

import React     from 'react';
import { mount } from 'enzyme';

import Text      from './index';


describe( 'TextDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Text /> );
    } );

    describe( 'click', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
