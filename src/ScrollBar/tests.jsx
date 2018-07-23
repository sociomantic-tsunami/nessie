/* global test jest */
/* eslint no-console: 0*/

import React               from 'react';
import { mount, shallow }  from 'enzyme';

import ScrollBar           from './index';

describe( 'ScrollBar', () =>
{
    let wrapper;
    let instance;
    let cssMap;

    beforeEach( () =>
    {
        wrapper  = shallow( <ScrollBar /> );
        instance = wrapper.instance();
        cssMap   = instance.props.cssMap;
    } );


    test( 'should contain exactly two <div>’s', () =>
    {
        expect( wrapper.find( 'div' ) ).toHaveLength( 2 );
    } );

    describe( 'props', () =>
    {
        describe( 'scrollMax', () =>
        {
            test( 'should be 0 by default', () =>
            {
                expect( instance.props.scrollMax ).toEqual( 0 );
            } );

            test( 'should be passed to the track <div> as aria-valuemax', () =>
            {
                wrapper.setProps( { scrollMax: 20 } );
                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'aria-valuemax' ) ).toBe( 20 );
            } );
        } );

        describe( 'scrollMin', () =>
        {
            test( 'should be 0 by default', () =>
            {
                expect( instance.props.scrollMin ).toBe( 0 );
            } );

            test( 'should be passed to the track <div> as aria-valuemin', () =>
            {
                wrapper.setProps( { scrollMin: 20 } );
                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'aria-valuemin' ) ).toBe( 20 );
            } );
        } );

        describe( 'scrollPos', () =>
        {
            test( 'should be 0 by default', () =>
            {
                expect( instance.props.scrollPos ).toBe( 0 );
            } );

            test( 'should be passed to the track <div> as aria-valuenow', () =>
            {
                wrapper.setProps( { scrollPos: 20 } );
                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'aria-valuenow' ) ).toBe( 20 );
            } );
        } );
    } );
} );


describe( 'ScrollBarDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ScrollBar /> );
    } );

    describe( 'clickTrack( val )', () =>
    {
        let onClickTrack;

        beforeEach( () => {
            onClickTrack = jest.fn();
            wrapper.setProps( { onClickTrack } );
            wrapper.driver().clickTrack( 100 );
        } );

        test( 'should call the onClickTrack prop once', () =>
        {
            expect( onClickTrack ).toHaveBeenCalledTimes( 1 );
        } );

        test( 'should call the onClickTrack prop with val', () =>
        {
            expect( onClickTrack ).toBeCalledWith( 100 );
        } );
    } );

    describe( 'onChange( val )', () =>
    {
        let onChange;

        beforeEach( () => {
            onChange = jest.fn();
            wrapper.setProps( { onChange } );
            wrapper.driver().change( 100 );
        } );

        test( 'should call the onChange prop once', () =>
        {
            expect( onChange ).toHaveBeenCalledTimes( 1 );
        } );

        test( 'should call the onChange prop with val', () =>
        {
            expect( onChange ).toBeCalledWith( 100 );
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should simulate mouse over', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver ).toHaveBeenCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut', () =>
    {
        test( 'should simulate mouse out', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut ).toHaveBeenCalledTimes( 1 );
        } );
    } );
} );
