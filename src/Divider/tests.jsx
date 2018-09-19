/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */
/* global test */
/* eslint no-console: 0*/


import React        from 'react';
import { mount }    from 'enzyme';

import Divider      from './index';

describe( 'Divider', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Divider /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
