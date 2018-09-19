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
import styles               from './tabButton.css';

const TabButton = ( {
    buttonRef,
    className,
    cssMap,
    isActive,
    isDisabled,
    label,
    onClick,
    subtitle,
    tabIndex,
} ) => (
    <button
        className = { buildClassName( className, cssMap, {
            active : isActive,
        } ) }
        disabled = { isDisabled }
        onClick  = { onClick }
        ref      = { buttonRef }
        role     = "tab"
        value    = { String( tabIndex ) }>
        <div className = { cssMap.content }>
            <div className = { cssMap.label }>
                { label }
                { subtitle &&
                    <span className = { cssMap.subtitle }>
                        { subtitle }
                    </span>
                }
            </div>
        </div>
    </button>
);

TabButton.propTypes =
{
    /**
     * Callback that receives the native <button>: ( ref ) => { ... }
     */
    buttonRef  : PropTypes.func,
    /**
     *  Extra CSS class name
     */
    className  : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Display as active
     */
    isActive   : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled : PropTypes.bool,
    /**
     *  Label text
     */
    label      : PropTypes.string,
    /**
     *  Click callback function: ( e ) => { ... }
     */
    onClick    : PropTypes.func,
    /**
     * Subtitle text
     */
    subtitle   : PropTypes.string,
    /**
     *  Index of this tab
     */
    tabIndex   : PropTypes.number,
};

TabButton.defaultProps =
{
    buttonRef  : undefined,
    className  : undefined,
    cssMap     : styles,
    isActive   : false,
    isDisabled : false,
    label      : undefined,
    onClick    : undefined,
    subtitle   : undefined,
    tabIndex   : 0,
};

export default TabButton;
