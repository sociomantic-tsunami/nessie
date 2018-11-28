/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import IconButton           from '../IconButton';

const ModalDialog = ( {
    children,
    className,
    cssMap,
    hasNavigation,
    isVisible,
    isWide,
    onClickClose,
    onClickNext,
    onClickOverlay,
    onClickPrev,
    title,
    type,
} ) =>
{
    if ( !isVisible )
    {
        return <div className = "modalContainer" />;
    }

    const handleOverlayClick = ( e ) =>
    {
        if ( e.target !== e.currentTarget ) return;

        if ( onClickOverlay )
        {
            onClickOverlay( e );
        }
    };

    const isCarousel = type === 'carousel';
    let modalUI      = null;

    if ( isCarousel )
    {
        modalUI = (
            <div className = "modalContainer">
                <div className = { cssMap.header }>
                    <span className = { cssMap.title }>{ title }</span>
                    <IconButton
                        iconSize = "L"
                        iconType = "close"
                        onClick  = { onClickClose } />
                </div>
                <div className = { cssMap.navigation }>
                    <IconButton
                        hasBackground
                        iconSize  = "M"
                        iconType  = "arrow"
                        onClick   = { onClickPrev } />
                    <IconButton
                        hasBackground
                        iconSize = "M"
                        iconType = "arrow"
                        onClick  = { onClickNext } />
                </div>
            </div>
        );
    }

    return (
        <div className = "modalContainer">
            <div
                className = { buildClassName( className, cssMap, {
                    showNav : hasNavigation,
                    type,
                    wide    : isWide,
                    showNav : hasNavigation,
                } ) }
                onClick   = { handleOverlayClick } >
                { modalUI }
                <div className = { cssMap.content }>
                    { children }
                </div>
            </div>
        </div>
    );
};
ModalDialog.propTypes =
{
    /**
     *  Dialog Content
     */
    children : PropTypes.node,
    /**
     *  Message type
     */
    type     : PropTypes.oneOf( [
        'default',
        'neutral',
        'crucial',
        'promoted',
        'carousel',
    ] ),
    /**
     *  Display the dialog
     */
    isVisible      : PropTypes.bool,
    /**
     *  Display a wider dialog (doesn’t apply to carousel)
     */
    isWide         : PropTypes.bool,
    /**
     *  Title displayed on carousel modal
     */
    title          : PropTypes.string,
    /**
     *  Show navigation buttons (only applies to carousel)
     */
    hasNavigation  : PropTypes.bool,
    /**
     *  Overlay onClick callback function
     */
    onClickOverlay : PropTypes.func,
    /**
     *  Function to call on “Previous” button click: ( e ) => { ... }
     */
    onClickPrev    : PropTypes.func,
    /**
     *  Function to call on “Next” button click: ( e ) => { ... }
     */
    onClickNext    : PropTypes.func,
    /**
     *  Function to call on “Close” button click: ( e ) => { ... }
     */
    onClickClose   : PropTypes.func,
};

ModalDialog.defaultProps =
{
    cssMap        : require( './modalDialog.css' ),
    hasNavigation : true,
};

export default ModalDialog;
