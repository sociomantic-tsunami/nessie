/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
/* eslint-disable no-magic-numbers, no-multi-str*/

import React       from 'react';
import { mount }   from 'enzyme';

import ModalDialog from './index';


describe( 'ModalDialog', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = null;
    } );

    test( 'should render <ModalDialog/>', () =>
    {
        wrapper = mount( <ModalDialog /> );

        expect( wrapper.find( ModalDialog ) ).toHaveLength( 1 );
    } );

    test( 'should not contain child elements when not visible', () =>
    {
        const props = {
            isVisible : false,
            children  : <span className = "thisguy">boom</span>,
        };
        wrapper = mount( <ModalDialog { ...props } /> );

        const children = wrapper.find( `.${wrapper.props().cssMap.content}` )
            .children();
        expect( children ).toHaveLength( 0 );
    } );

    test( 'should contain child elements when visible', () =>
    {
        const props = {
            isVisible : true,
            children  : <span className = "thisguy">boom</span>,
        };
        wrapper = mount( <ModalDialog { ...props } /> );

        const children = wrapper.find( `.${wrapper.props().cssMap.content}` )
            .children();
        expect( children ).toBeTruthy();
        expect( children.html() ).toBe( '<span class="thisguy">boom</span>' );
    } );

    test(
        'should trigger `onClickOverlay` once callback when overlay clicked',
        () =>
        {
            const callBack = jest.fn();
            const props = {
                isVisible      : true,
                onClickOverlay : callBack,
            };
            wrapper = mount( <ModalDialog { ...props } /> );

            wrapper.driver().clickOverlay();
            expect( callBack ).toHaveBeenCalledTimes( 1 );
        },
    );

    test(
        'should trigger `onClickClose` once when close button is clicked',
        () =>
        {
            const callBack = jest.fn();
            const props = {
                isVisible    : true,
                onClickClose : callBack,
                type         : 'carousel',
            };
            wrapper = mount( <ModalDialog { ...props } /> );

            wrapper.driver().clickClose();
            expect( callBack ).toHaveBeenCalledTimes( 1 );
        },
    );

    test( 'should trigger `onClickPrev` once when prev button is clicked', () =>
    {
        const callBack = jest.fn();
        const props = {
            isVisible   : true,
            onClickPrev : callBack,
            type        : 'carousel',
        };
        wrapper = mount( <ModalDialog { ...props } /> );

        wrapper.driver().clickPrev();
        expect( callBack ).toHaveBeenCalledTimes( 1 );
    } );

    test( 'should trigger `onClickNext` once when next button is clicked', () =>
    {
        const callBack = jest.fn();
        const props = {
            isVisible   : true,
            onClickNext : callBack,
            type        : 'carousel',
        };
        wrapper = mount( <ModalDialog { ...props } /> );

        wrapper.driver().clickNext();
        expect( callBack ).toHaveBeenCalledTimes( 1 );
    } );

    describe( 'driver', () =>
    {
        test( 'should throw an error when clicking the close button on a modal \
that\'s not a carousel', () =>
        {
            const callBack = jest.fn();
            const props = {
                isVisible      : true,
                onClickOverlay : callBack,
            };

            wrapper = mount( <ModalDialog { ...props } /> );

            expect( () => wrapper.driver().clickClose() )
                .toThrowError( 'Cannot trigger click on the "Close Button" \
because the modal is not a Carousel' );
            expect( callBack ).not.toBeCalled();
        } );

        test( 'should throw an error when clicking the prev button on a modal \
that\'s not a carousel', () =>
        {
            const callBack = jest.fn();
            const props = {
                isVisible   : true,
                onClickPrev : callBack,
            };

            wrapper = mount( <ModalDialog { ...props } /> );

            expect( () => wrapper.driver().clickPrev() )
                .toThrowError( 'Cannot trigger click on the "Prev Button" \
because the modal is not a Carousel' );
            expect( callBack ).not.toBeCalled();
        } );

        test( 'should throw an error when clicking the next button on a modal \
that\'s not a carousel', () =>
        {
            const callBack = jest.fn();
            const props = {
                isVisible   : true,
                onClickNext : callBack,
            };

            wrapper = mount( <ModalDialog { ...props } /> );

            expect( () => wrapper.driver().clickNext() )
                .toThrowError( 'Cannot trigger click on the "Next Button" \
because the modal is not a Carousel' );
            expect( callBack ).not.toBeCalled();
        } );
    } );
} );
