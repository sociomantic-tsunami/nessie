/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                            from 'react';
import PropTypes                        from 'prop-types';

import { generateId, buildClassName }   from '../utils';
import InputField                       from '../InputField';
import InputContainer                   from '../proto/InputContainer';
import styles                           from './textInput.css';


const TextInput = ( {
    className,
    cssMap,
    id = generateId( 'TextInput' ),
    onMouseOut,
    onMouseOver,
    ...props
} ) => (
    <InputContainer
        { ...props }
        className   = { buildClassName( className, cssMap ) }
        id          = { id }
        onMouseOut  = { onMouseOut }
        onMouseOver = { onMouseOver }>
        <InputField { ...props } id = { id } type = "text" />
    </InputContainer>
);

TextInput.propTypes =
{
    /**
     *  ARIA properties
     */
    aria : PropTypes.objectOf( PropTypes.oneOfType( [
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ] ) ),
    /**
     *  HTML attribute controlling input auto capitalize
     */
    autoCapitalize : PropTypes.oneOf( [
        'on',
        'off',
        'none',
        'sentences',
        'words',
        'characters',
    ] ),
    /**
     *  HTML attribute controlling input auto complete
     */
    autoComplete          : PropTypes.string,
    /**
     *  HTML attribute controlling input auto correct (Safari-specific)
     */
    autoCorrect           : PropTypes.oneOf( [ 'on', 'off' ] ),
    /**
     *  Extra CSS class name
     */
    className             : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap                : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Initial input string value
     */
    defaultValue          : PropTypes.string,
    /**
     *  Tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
     *  Error Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
    *   Error message position relative to the icon
    */
    errorMessagePosition  : PropTypes.oneOf( [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom',
    ] ),
    /**
     *  Display as hover when required from another component
     */
    forceHover    : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError      : PropTypes.bool,
    /**
     *  HTML id attribute
     */
    id            : PropTypes.string,
    /**
     *  Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef      : PropTypes.func,
    /**
     *  Display as disabled
     */
    isDisabled    : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly    : PropTypes.bool,
    /**
     *  Label text (string or JSX node)
     */
    label         : PropTypes.node,
    /**
     *  Label position
     */
    labelPosition : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
     *  HTML name attribute
     */
    name          : PropTypes.string,
    /**
     *  Blur callback function
     */
    onBlur        : PropTypes.func,
    /**
     *  Input change callback function
     */
    onChange      : PropTypes.func,
    /**
     *  Input click callback function
     */
    onClick       : PropTypes.func,
    /**
     *  Focus callback function
     */
    onFocus       : PropTypes.func,
    /**
     *  Key down callback function
     */
    onKeyDown     : PropTypes.func,
    /**
     *  Key press callback function
     */
    onKeyPress    : PropTypes.func,
    /**
     *  Key up callback function
     */
    onKeyUp       : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOut    : PropTypes.func,
    /**
     *  Mouse over  callback function
     */
    onMouseOver   : PropTypes.func,
    /**
     *  Placeholder text
     */
    placeholder   : PropTypes.string,
    /**
     *  HTML attribute controlling input spell check
     */
    spellCheck    : PropTypes.bool,
    /**
     *  Input text alignment
     */
    textAlign     : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
     *  Input string value
     */
    value         : PropTypes.string,
};

TextInput.defaultProps =
{
    aria                  : undefined,
    autoCapitalize        : undefined,
    autoComplete          : undefined,
    autoCorrect           : undefined,
    className             : undefined,
    cssMap                : styles,
    defaultValue          : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    errorMessagePosition  : 'top',
    forceHover            : false,
    hasError              : false,
    id                    : undefined,
    inputRef              : undefined,
    isDisabled            : false,
    isReadOnly            : false,
    label                 : undefined,
    labelPosition         : 'top',
    name                  : undefined,
    onBlur                : undefined,
    onChange              : undefined,
    onClick               : undefined,
    onFocus               : undefined,
    onKeyDown             : undefined,
    onKeyPress            : undefined,
    onKeyUp               : undefined,
    onMouseOut            : undefined,
    onMouseOver           : undefined,
    placeholder           : undefined,
    spellCheck            : undefined,
    textAlign             : undefined,
    value                 : undefined,
};

export default TextInput;
