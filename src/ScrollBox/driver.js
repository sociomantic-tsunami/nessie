/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { ScrollBar } from 'nessie-ui';

const ERRORS = {
    SCROLL_CANNOT_BE_CLICKED   : ( prop ) => `Button cannot be clicked since it doesn't have ${prop} prop`, // eslint-disable-line max-len
    CANNOT_SCROLL_IN_DIRECTION : ( direction ) => `Cannot scroll because scroll direction is neither '${direction}' nor 'both'` // eslint-disable-line max-len
};

export default class ScrollBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper   = wrapper;
        this.props     = this.wrapper.props();
        this.scrollBox = this.wrapper.find(
            `.${wrapper.prop( 'cssMap' ).inner}` );
    }

    clickScrollUp()
    {
        if ( !this.props.scrollUpIsVisible )
        {
            throw new Error( ERRORS
                .SCROLL_CANNOT_BE_CLICKED( 'scrollUpIsVisible' ) );
        }

        this.wrapper.find( `.${this.wrapper.prop( 'cssMap' ).iconUp}` )
            .first().simulate( 'click' );
        return this;
    }

    clickScrollRight()
    {
        if ( !this.props.scrollRightIsVisible )
        {
            throw new Error( ERRORS
                .SCROLL_CANNOT_BE_CLICKED( 'scrollRightIsVisible' ) );
        }

        this.wrapper.find( `.${this.wrapper.prop( 'cssMap' ).iconRight}` )
            .first().simulate( 'click' );
        return this;
    }

    clickScrollDown()
    {
        if ( !this.props.scrollDownIsVisible )
        {
            throw new Error( ERRORS
                .SCROLL_CANNOT_BE_CLICKED( 'scrollDownIsVisible' ) );
        }

        this.wrapper.find( `.${this.wrapper.prop( 'cssMap' ).iconDown}` )
            .first().simulate( 'click' );
        return this;
    }

    clickScrollLeft()
    {
        if ( !this.props.scrollLeftIsVisible )
        {
            throw new Error( ERRORS
                .SCROLL_CANNOT_BE_CLICKED( 'scrollLeftIsVisible' ) );
        }

        this.wrapper.find( `.${this.wrapper.prop( 'cssMap' ).iconLeft}` )
            .first().simulate( 'click' );
        return this;
    }

    scrollVertical( scrollOffset = 0 )
    {
        if ( !( this.props.scroll === 'vertical' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error( ERRORS.CANNOT_SCROLL_IN_DIRECTION( 'vertical' ) );
        }

        const node     = this.scrollBox.getNode();
        node.scrollTop = scrollOffset;
        this.scrollBox.simulate( 'scroll' );

        return this;
    }

    scrollHorizontal( scrollOffset = 0 )
    {
        if ( !( this.props.scroll === 'horizontal' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error( ERRORS
                .CANNOT_SCROLL_IN_DIRECTION( 'horizontal' ) );
        }

        const node      = this.scrollBox.getNode();
        node.scrollLeft = scrollOffset;
        this.scrollBox.simulate( 'scroll' );

        return this;
    }

    seekVertical( scrollOffset )
    {
        if ( !( this.props.scroll === 'vertical' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error( ERRORS.CANNOT_SCROLL_IN_DIRECTION( 'vertical' ) );
        }

        const node     = this.scrollBox.getNode();
        const scrollBar = this.wrapper.find( ScrollBar ).last();
        node.scrollTop = scrollOffset;
        this.scrollBox.simulate( 'scroll' );
        scrollBar.driver().change( scrollOffset );
        return this;
    }

    seekHorizontal( scrollOffset )
    {
        if ( !( this.props.scroll === 'vertical' ||
            this.props.scroll === 'both' ) )
        {
            throw new Error( ERRORS.CANNOT_SCROLL_IN_DIRECTION( 'vertical' ) );
        }

        const node     = this.scrollBox.getNode();
        const scrollBar = this.wrapper.find( ScrollBar ).first();
        node.scrollLeft = scrollOffset;
        this.scrollBox.simulate( 'scroll' );
        scrollBar.driver().change( scrollOffset );
        return this;
    }
}
