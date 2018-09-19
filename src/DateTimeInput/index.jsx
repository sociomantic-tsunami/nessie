/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { DatePicker }               from '../index';
import TextInputWithIcon            from '../TextInputWithIcon';
import withDropdown                 from '../Dropdown/withDropdown';
import withInputContainer           from '../proto/withInputContainer';
import { eventHandler, generateId } from '../utils';


const InputWithDropdown = withDropdown( TextInputWithIcon );

const DateTimeInput = ( {
    className,
    currentMonth,
    currentYear,
    days,
    forceHover,
    hasError,
    hourIsDisabled,
    hourIsReadOnly,
    hourInputRef,
    hourPlaceholder,
    hourValue,
    id = generateId( 'DateTimeInput' ),
    inputPlaceholder,
    inputRef,
    inputValue,
    isDisabled,
    isOpen,
    isReadOnly,
    isReadOnlyButton,
    isReadOnlyInput,
    minuteIsDisabled,
    minuteIsReadOnly,
    minuteInputRef,
    minutePlaceholder,
    minuteValue,
    mode,
    months,
    nextIsDisabled,
    nextIsReadOnly,
    onBlur,
    onChange,
    onClickCell,
    onClickIcon,
    onClickNext,
    onClickPrev,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseOut,
    onMouseOutIcon,
    onMouseOver,
    onMouseOverIcon,
    prevIsDisabled,
    prevIsReadOnly,
    textAlign,
    weeks,
} ) =>
{
    const datePicker = (
        <DatePicker
            headers           = { mode !== 'month' ? days : undefined }
            hourInputRef      = { hourInputRef }
            hourIsDisabled    = { hourIsDisabled }
            hourIsReadOnly    = { hourIsReadOnly }
            hourPlaceholder   = { hourPlaceholder }
            hourValue         = { hourValue }
            isDisabled        = { isDisabled }
            isReadOnly        = { isReadOnly }
            items             = { mode === 'month' ? months : weeks }
            key               = "datePicker"
            minuteInputRef    = { minuteInputRef }
            minuteIsDisabled  = { minuteIsDisabled }
            minuteIsReadOnly  = { minuteIsReadOnly }
            minutePlaceholder = { minutePlaceholder }
            minuteValue       = { minuteValue }
            mode              = { mode }
            month             = { currentMonth }
            nextIsDisabled    = { nextIsDisabled }
            nextIsReadOnly    = { nextIsReadOnly }
            onBlur            = { onBlur }
            onChange          = { onChange }
            onClickItem       = { onClickCell }
            onClickNext       = { onClickNext }
            onClickPrev       = { onClickPrev }
            onFocus           = { onFocus }
            onKeyPress        = { onKeyPress }
            prevIsDisabled    = { prevIsDisabled }
            prevIsReadOnly    = { prevIsReadOnly }
            type              = { mode === 'month' ? 'month' : 'day' }
            year              = { currentYear } />
    );

    const dropdownProps = {
        children : datePicker,
        hasError,
        padding  : 'none',
        size     : 'content',
    };

    return (
        <InputWithDropdown
            autoCapitalize   = "off"
            autoComplete     = "off"
            autoCorrect      = "off"
            className        = { className }
            dropdownIsOpen   = { isOpen }
            dropdownProps    = { dropdownProps }
            forceHover       = { forceHover || isOpen }
            hasError         = { hasError }
            iconType         = "calendar"
            id               = { id }
            inputRef         = { inputRef }
            isDisabled       = { isDisabled }
            isReadOnly       = { isReadOnly }
            isReadOnlyButton = { isReadOnlyButton }
            isReadOnlyInput  = { isReadOnlyInput }
            onBlur           = { eventHandler( onBlur, 'main' ) }
            onChange         = { eventHandler( onChange, 'main' ) }
            onClickIcon      = { onClickIcon }
            onFocus          = { eventHandler( onFocus, 'main' ) }
            onKeyDown        = { onKeyDown }
            onKeyPress       = { eventHandler( onKeyPress, 'main' ) }
            onKeyUp          = { onKeyUp }
            onMouseOut       = { onMouseOut }
            onMouseOutIcon   = { onMouseOutIcon }
            onMouseOver      = { onMouseOver }
            onMouseOverIcon  = { onMouseOverIcon }
            placeholder      = { inputPlaceholder }
            spellCheck       = { false }
            textAlign        = { textAlign }
            value            = { inputValue } />
    );
};

DateTimeInput.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className             : PropTypes.string,
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
    errorMessagePosition  : PropTypes.oneOf( [ 'top', 'topLeft' ] ),
    /**
     *  Current month to disaplay in default/day mode
     */
    currentMonth          : PropTypes.string,
    /**
     *  Current year to display
     */
    currentYear           : PropTypes.string,
    /**
     *  Days of week to display
     */
    days                  : PropTypes.arrayOf( PropTypes.object ),
    /**
     *  Display as hover when required from another component
     */
    forceHover            : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
    /**
     *  Hour input ref callback function:
     *  ( ref ) = { ... }
     */
    hourInputRef          : PropTypes.func,
    /**
     *  Hour input is disabled
     */
    hourIsDisabled        : PropTypes.bool,
    /**
     *  Hour input placeholder text
     */
    hourPlaceholder       : PropTypes.string,
    /**
     *  Hour input value
     */
    hourValue             : PropTypes.string,
    /**
     *  HTML id attribute
     */
    id                    : PropTypes.string,
    /**
     *  Main input placeholder text
     */
    inputPlaceholder      : PropTypes.string,
    /**
     *  Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef              : PropTypes.func,
    /**
     *  Main input value
     */
    inputValue            : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled            : PropTypes.bool,
    /**
     *  Picker is open
     */
    isOpen                : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly            : PropTypes.bool,
    /**
     *  Display as read-only for IconButton
     */
    isReadOnlyButton      : PropTypes.bool,
    /**
     *  “Previous” button is read only
     */
    prevIsReadOnly        : PropTypes.bool,
    /**
     *  Display as read-only for TextInput
     */
    isReadOnlyInput       : PropTypes.bool,
    /**
     *  “Next” button is read only
     */
    nextIsReadOnly        : PropTypes.bool,
    /**
     *  Label text (string or JSX node)
     */
    label                 : PropTypes.node,
    /**
     *  Label position
     */
    labelPosition         : PropTypes.oneOf( [ 'top', 'left', 'right' ] ),
    /**
     *  Minute input ref callback function:
     *  ( ref ) = { ... }
     */
    minuteInputRef        : PropTypes.func,
    /**
     *  Hour input is read only
     */
    hourIsReadOnly        : PropTypes.bool,
    /**
     *  Minute input is disabled
     */
    minuteIsDisabled      : PropTypes.bool,
    /**
     *  Minute input is read only
     */
    minuteIsReadOnly      : PropTypes.bool,
    /**
     *  Minute input placeholder text
     */
    minutePlaceholder     : PropTypes.string,
    /**
     *  Minute input value
     */
    minuteValue           : PropTypes.string,
    /**
     *  Picker mode
     */
    mode                  : PropTypes.oneOf( [ 'default', 'date', 'month' ] ),
    /**
     *  Months to display in month mode
     */
    months                : PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.object ) ),
    /**
     *  “Next” button is disabled
     */
    nextIsDisabled        : PropTypes.bool,
    /**
     *  Blur callback function
     */
    onBlur                : PropTypes.func,
    /**
     *  Input change callback function
     */
    onChange              : PropTypes.func,
    /**
     *  Icon click callback function
     */
    onClickIcon           : PropTypes.func,
    /**
     *  onClick callback function for calendar date cell
     */
    onClickCell           : PropTypes.func,
    /**
     *  onClick callback function for “Next” button
     */
    onClickNext           : PropTypes.func,
    /**
     *  onClick callback function for “Previous” button
     */
    onClickPrev           : PropTypes.func,
    /**
     *  Focus callback function
     */
    onFocus               : PropTypes.func,
    /**
     *  Key down callback function
     */
    onKeyDown             : PropTypes.func,
    /**
     *  Key press callback function
     */
    onKeyPress            : PropTypes.func,
    /**
     *  Key up callback function
     */
    onKeyUp               : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOut            : PropTypes.func,
    /**
     *  Icon mouse out callback function
     */
    onMouseOutIcon        : PropTypes.func,
    /**
     *  Mouse over  callback function
     */
    onMouseOver           : PropTypes.func,
    /**
     *  Icon mouse over callback function
     */
    onMouseOverIcon       : PropTypes.func,
    /**
     *  “Previous” button is disabled
     */
    prevIsDisabled        : PropTypes.bool,
    /**
     *  Input text alignment
     */
    textAlign             : PropTypes.oneOf( [ 'auto', 'left', 'right' ] ),
    /**
     *  Weeks to display in default/day mode
     */
    weeks                 : PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.object ) ),
};

DateTimeInput.defaultProps =
{
    className             : undefined,
    currentMonth          : undefined,
    currentYear           : undefined,
    days                  : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : undefined,
    errorMessagePosition  : undefined,
    forceHover            : false,
    hasError              : false,
    hourInputRef          : undefined,
    hourIsDisabled        : false,
    hourPlaceholder       : undefined,
    hourValue             : undefined,
    id                    : undefined,
    inputPlaceholder      : undefined,
    inputRef              : undefined,
    inputValue            : undefined,
    isDisabled            : false,
    isOpen                : false,
    isReadOnly            : false,
    isReadOnlyButton      : undefined,
    isReadOnlyInput       : undefined,
    label                 : undefined,
    labelPosition         : undefined,
    minuteInputRef        : undefined,
    minuteIsDisabled      : false,
    minutePlaceholder     : undefined,
    minuteValue           : undefined,
    mode                  : 'default',
    months                : undefined,
    nextIsDisabled        : false,
    onBlur                : undefined,
    onChange              : undefined,
    onClickCell           : undefined,
    onClickIcon           : undefined,
    onClickNext           : undefined,
    onClickPrev           : undefined,
    onFocus               : undefined,
    onKeyDown             : undefined,
    onKeyPress            : undefined,
    onKeyUp               : undefined,
    onMouseOut            : undefined,
    onMouseOutIcon        : undefined,
    onMouseOver           : undefined,
    onMouseOverIcon       : undefined,
    prevIsDisabled        : false,
    textAlign             : 'auto',
    weeks                 : undefined,
};

export { DateTimeInput };
export default withInputContainer( DateTimeInput );
