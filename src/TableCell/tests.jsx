/* global test jest */

import React       from 'react';
import { mount }   from 'enzyme';

import TableCell   from './index';

describe( 'TableCellDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <TableCell /> );
        driver  = wrapper.driver();
    } );

    describe( 'toggle()', () =>
    {
        test( 'should trigger onToggle callback function once', () =>
        {
            const onToggle = jest.fn();

            wrapper.setProps( {
                onToggle,
                isHeader   : true,
                isSortable : true,
            } );

            driver.toggle();

            expect( onToggle ).toBeCalledTimes( 1 );
        } );

        test(
            'should throw an expected error if TableCell is not sortable',
            () =>
            {
                const onToggle = jest.fn();
                const expectedError = 'TableCell cannot be toggled since it\'s \
not sortable';

                wrapper.setProps( {
                    onToggle,
                    isHeader : true,
                } );

                expect( () => driver.toggle() ).toThrow( expectedError );
            },
        );
    } );
} );
