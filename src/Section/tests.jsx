/* global test */
/* eslint no-console: 0*/

import React              from 'react';
import { mount, shallow } from 'enzyme';


import { H1, H4 }         from '../index';

import Section            from './index';

describe( 'Section', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Section /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name Button', () =>
        {
            expect( instance.constructor.name ).toBe( 'Section' );
        } );
    } );

    describe( 'render()', () =>
    {
      
        test(
            'should have a header component corresponding to level prop',
            () =>
            {
                wrapper.setProps( {
                    title : 'Boom',
                    level : 4
                } );

                expect( wrapper.find( H4 ) ).toHaveLength( 1 );
            }
        );
    } );

    describe( 'props', () =>
    {
        describe( 'title', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.title ).toBeUndefined();
            } );

            test( 'should be passed to the header component as children', () =>
            {
                wrapper.setProps( {
                    title : 'Boom',
                    level : 1
                } );

                expect( wrapper.find( H1 ).prop( 'children' ) ).toBe( 'Boom' );
            } );
        } );
    } );
} );


describe( 'SectionDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Section /> );
    } );

    describe( 'getContent()', () =>
    {
        test( 'should return the content', () =>
        {
            const children = (
                <Section title = "Pikachu">
                    <h2>Lightning Strike</h2>
                </Section>
            );

            wrapper.setProps( {  children } );
            const content = wrapper.find( `.${wrapper.props().cssMap.content}` )
                .children();
            expect( content.find( 'h2' ).text() ).toBe( 'Lightning Strike' );
        } );
    } );
} );
