/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                     from 'react';
import PropTypes                 from 'prop-types';
import { isEqual }               from 'lodash';

import { IconButton, ScrollBar } from '..';

import ThemeContext              from '../Theming/ThemeContext';
import { createCssMap }          from '../Theming';
import {
    attachEvents,
    createEventHandler,
    generateId,
} from '../utils';


export default class ScrollBox extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  ScrollBox content
         */
        children           : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className          : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap             : PropTypes.objectOf( PropTypes.string ),
        /**
         *  ScrollBox content width, any CSS length string
         */
        contentWidth       : PropTypes.string,
        /**
         *  ScrollBox height, any CSS length string
         */
        height             : PropTypes.string,
        /**
         *  on scroll callback function
         */
        onScroll           : PropTypes.func,
        /**
         *  scroll down button click callback function
         */
        onClickScrollDown  : PropTypes.func,
        /**
         *  scroll left button click callback function
         */
        onClickScrollLeft  : PropTypes.func,
        /**
         *  scroll right button click callback function
         */
        onClickScrollRight : PropTypes.func,
        /**
         *  scroll up button click callback function
         */
        onClickScrollUp    : PropTypes.func,
        /**
         *  Scroll direction
         */
        scroll             : PropTypes.oneOf( [
            'horizontal',
            'vertical',
            'both',
        ] ),
        /**
         *  Amount of pixels to scroll by
         */
        scrollAmount : PropTypes.oneOfType( [
            PropTypes.number,
            PropTypes.arrayOf( PropTypes.number ),
        ] ),
        /**
        *   ScrollBox padding
        */
        padding : PropTypes.oneOfType( [
            PropTypes.oneOf( [ 'none', 'S', 'M', 'L', 'XL', 'XXL' ] ),
            PropTypes.arrayOf( PropTypes.oneOf( [
                'none',
                'S',
                'M',
                'L',
                'XL',
                'XXL',
            ] ) ),
        ] ),
        /**
         *  Display Scroll bars
         */
        scrollBarsAreVisible   : PropTypes.bool,
        /**
         * DOM element "Scrollbox inner"
         */
        scrollBoxRef           : PropTypes.string,
        /**
         *  Display Scroll down icon
         */
        scrollDownIsVisible    : PropTypes.bool,
        /**
         *  Display Scroll down icon
         */
        scrollIndicatorVariant : PropTypes.oneOf( [ 'circle', 'gradient' ] ),
        /**
         *  Display Scroll left icon
         */
        scrollLeftIsVisible    : PropTypes.bool,
        /**
         *  Display Scroll right icon
         */
        scrollRightIsVisible   : PropTypes.bool,
        /**
         *  Display Scroll up icon
         */
        scrollUpIsVisible      : PropTypes.bool,
    };

    static defaultProps =
    {
        children               : undefined,
        className              : undefined,
        contentWidth           : undefined,
        cssMap                 : undefined,
        height                 : undefined,
        onClickScrollDown      : undefined,
        onClickScrollLeft      : undefined,
        onClickScrollRight     : undefined,
        onClickScrollUp        : undefined,
        onScroll               : undefined,
        padding                : 'none',
        scroll                 : 'both',
        scrollAmount           : undefined,
        scrollBarsAreVisible   : true,
        scrollBoxRef           : undefined,
        scrollDownIsVisible    : false,
        scrollIndicatorVariant : 'circle',
        scrollLeftIsVisible    : false,
        scrollRightIsVisible   : false,
        scrollUpIsVisible      : false,
    };

    static displayName = 'ScrollBox';

    constructor()
    {
        super();

        this.state = {
            clientHeight : null,
            clientWidth  : null,
            id           : generateId( 'ScrollBox' ),
            offsetHeight : null,
            offsetWidth  : null,
            scrollHeight : null,
            scrollLeft   : null,
            scrollTop    : null,
            scrollWidth  : null,
        };

        this.handleChangeX     = this.handleChangeX.bind( this );
        this.handleChangeY     = this.handleChangeY.bind( this );
        this.handleClickTrackX = this.handleClickTrackX.bind( this );
        this.handleClickTrackY = this.handleClickTrackY.bind( this );
        this.handleRef         = this.handleRef.bind( this );
        this.handleScroll      = this.handleScroll.bind( this );
    }

    componentDidMount()
    {
        this.setState( this.getNewState() );
    }

    componentDidUpdate()
    {
        const newState = this.getNewState();

        if ( !isEqual( newState, this.state ) )
        {
            this.setState( newState );
        }
    }

    getInnerStyle()
    {
        const style = { maxHeight: this.props.height };

        if ( this.innerRef )
        {
            const { state } = this;

            // space taken by native scrollbars
            const diffX = state.offsetWidth - state.clientWidth;
            const diffY = state.offsetHeight - state.clientHeight;

            if ( diffX || diffY )
            {
                Object.assign( style, {
                    width        : diffX ? `calc( 100% + ${diffX}px )` : null,
                    height       : diffY ? `calc( 100% + ${diffY}px )` : null,
                    marginRight  : diffX ? `-${diffX}px` : null,
                    marginBottom : diffY ? `-${diffY}px` : null,
                } );
            }
            else
            {
                // compensate for macOS overlaid scrollbars
                const compo = 20;

                Object.assign( style, {
                    padding : `${compo}px`,
                    margin  : `-${compo}px`,
                } );
            }
        }

        return style;
    }

    getNewState()
    {
        const newState = {};
        Object.keys( this.state ).forEach( key =>
            newState[ key ] = this.innerRef[ key ] );

        return newState;
    }

    handleClickScrollButton( dir, e )
    {
        const callback = this.props[ `onClickScroll${dir}` ];
        if ( callback )
        {
            callback( e );
        }

        const { scrollAmount } = this.props;

        if ( dir === 'Up' || dir === 'Down' )
        {
            const { clientHeight, scrollTop } = this.state;

            let amount = clientHeight;
            if ( scrollAmount )
            {
                amount = Array.isArray( scrollAmount ) ?
                    scrollAmount[ 1 ] : scrollAmount;
            }

            const increment = dir === 'Down' ? amount : -amount;
            this.innerRef.scrollTop = scrollTop + increment;
        }

        if ( dir === 'Left' || dir === 'Right' )
        {
            const { clientWidth, scrollLeft } = this.state;

            let amount = clientWidth;
            if ( scrollAmount )
            {
                amount = Array.isArray( scrollAmount ) ?
                    scrollAmount[ 0 ] : scrollAmount;
            }

            const increment = dir === 'Right' ? amount : -amount;
            this.innerRef.scrollLeft = scrollLeft + increment;
        }
    }

    handleClickTrackX( pos )
    {
        const { scrollAmount } = this.props;
        const { clientWidth, scrollLeft } = this.state;

        let amount = clientWidth;
        if ( scrollAmount )
        {
            amount = Array.isArray( scrollAmount ) ?
                scrollAmount[ 0 ] : scrollAmount;
        }

        const increment = pos >= scrollLeft ? amount : -amount;
        this.innerRef.scrollLeft = scrollLeft + increment;
    }

    handleClickTrackY( pos )
    {
        const { scrollAmount } = this.props;
        const { clientHeight, scrollTop } = this.state;

        let amount = clientHeight;
        if ( scrollAmount )
        {
            amount = Array.isArray( scrollAmount ) ?
                scrollAmount[ 1 ] : scrollAmount;
        }

        const increment = pos >= scrollTop ? amount : -amount;
        this.innerRef.scrollTop = scrollTop + increment;
    }

    handleChangeX( pos )
    {
        this.innerRef.scrollLeft = pos;
    }

    handleChangeY( pos )
    {
        this.innerRef.scrollTop = pos;
    }

    handleRef( ref )
    {
        if ( ref )
        {
            if ( this.props.scrollBoxRef )
            {
                this.props.scrollBoxRef.current = ref;
            }

            this.innerRef = ref;
        }
    }

    handleScroll()
    {
        this.forceUpdate();
    }

    canScroll( dir )
    {
        const {
            scrollTop,
            scrollLeft,
            clientHeight,
            clientWidth,
            scrollHeight,
            scrollWidth,
        } = this.state;

        if ( dir === 'Up' && scrollTop === 0 )
        {
            return false;
        }

        if ( dir === 'Down' &&
            ( scrollTop + clientHeight ) >= scrollHeight )
        {
            return false;
        }

        if ( dir === 'Left' && scrollLeft === 0 )
        {
            return false;
        }

        if ( dir === 'Right' &&
            ( scrollLeft + clientWidth ) >= scrollWidth )
        {
            return false;
        }

        return true;
    }

    renderScrollBars()
    {
        if ( !this.innerRef )
        {
            return;
        }

        const { props } = this;
        const {
            cssMap = createCssMap( this.context.ScrollBox, this.props ),
            scroll,
        } = props;

        const scrollBars = [];

        if ( scroll !== 'vertical' )
        {
            const { clientWidth, scrollLeft, scrollWidth } = this.state;

            if ( scrollWidth > clientWidth )
            {
                scrollBars.push(
                    <ScrollBar
                        className    = { cssMap.scrollBarHorizontal }
                        key          = "horizontal"
                        onChange     = { this.handleChangeX }
                        onClickTrack = { this.handleClickTrackX }
                        orientation  = "horizontal"
                        scrollMax    = { scrollWidth - clientWidth }
                        scrollPos    = { scrollLeft }
                        thumbSize    = {
                            `${( clientWidth / scrollWidth ) * 100}%`
                        } />,
                );
            }
        }

        if ( scroll !== 'horizontal' )
        {
            const { clientHeight, scrollHeight, scrollTop } = this.state;

            if ( scrollHeight > clientHeight )
            {
                scrollBars.push(
                    <ScrollBar
                        className    = { cssMap.scrollBarVertical }
                        key          = "vertical"
                        length       = { `${clientHeight}px` }
                        onChange     = { this.handleChangeY }
                        onClickTrack = { this.handleClickTrackY }
                        orientation  = "vertical"
                        scrollMax    = { scrollHeight - clientHeight  }
                        scrollPos    = { scrollTop }
                        thumbSize    = {
                            `${( clientHeight / scrollHeight ) * 100}%`
                        } />,
                );
            }
        }

        return scrollBars;
    }

    renderScrollButtons()
    {
        const { props } = this;
        const {
            cssMap = createCssMap( this.context.ScrollBox, this.props ),
            scrollIndicatorVariant,
        } = props;
        const scrollButtons = [];

        [ 'Up', 'Down', 'Left', 'Right' ].forEach( dir =>
        {
            if ( props[ `scroll${dir}IsVisible` ] && this.canScroll( dir ) )
            {
                scrollButtons.push(
                    <IconButton
                        className     = { cssMap[ `icon${dir}` ] }
                        hasBackground = {
                            scrollIndicatorVariant === 'circle'
                        }
                        iconSize = "S"
                        iconType = { `chevron-${dir.toLowerCase()}` }
                        key      = { dir }
                        onClick  = { e => (
                            this.handleClickScrollButton( dir, e )
                        ) } />,
                );
            }
        } );

        return scrollButtons;
    }

    render()
    {
        const {
            children,
            contentWidth,
            cssMap = createCssMap( this.context.ScrollBox, this.props ),
            height,
            onScroll,
            scrollBarsAreVisible,
        } = this.props;

        return (
            <div
                { ...attachEvents( this.props, {
                    onScroll : false,
                } ) }
                className = { cssMap.main }
                style     = { { maxHeight: height } }>
                <div
                    className = { cssMap.inner }
                    onScroll  = { createEventHandler(
                        onScroll,
                        this.handleScroll,
                    ) }
                    ref   = { this.handleRef }
                    style = { this.getInnerStyle() }>
                    <div
                        className = { cssMap.content }
                        style     = { contentWidth && { width: contentWidth } }>
                        { children }
                    </div>
                </div>
                { this.renderScrollButtons() }
                { scrollBarsAreVisible && this.renderScrollBars() }
            </div>
        );
    }
}
