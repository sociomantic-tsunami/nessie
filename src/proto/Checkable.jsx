import React                          from 'react';
import PropTypes                      from 'prop-types';

import Text                           from '../Text';
import { buildClassName, generateId } from '../utils';


const Checkable = ( {
    children,
    className,
    cssMap,
    forceHover,
    hasError,
    id = generateId( 'Checkable' ),
    inputRef,
    isDefaultChecked,
    isDisabled,
    isChecked,
    isReadOnly,
    label,
    name,
    onChange,
    onMouseOut,
    onMouseOver,
    type,
    value,
} ) =>
{
    let labelText = children || label;

    if ( typeof labelText === 'string' )
    {
        labelText = <Text>{ labelText }</Text>;
    }

    return (
        <div
            className = { buildClassName( className, cssMap, {
                disabled    : isDisabled,
                error       : !isDisabled && hasError,
                fakeHovered : !isDisabled && forceHover,
            } ) }
            onMouseOut  = { onMouseOut }
            onMouseOver = { onMouseOver }>
            <input
                checked        = { isChecked }
                className      = { cssMap.input }
                defaultChecked = { isDefaultChecked }
                disabled       = { isDisabled }
                id             = { id }
                name           = { name }
                onChange       = { onChange }
                readOnly       = { isReadOnly }
                ref            = { inputRef }
                type           = { type }
                value          = { value } />
            <label className = { cssMap.label } htmlFor = { id }>
                { labelText }
            </label>
        </div>
    );
};


Checkable.propTypes =
{
    /**
     *  Label content (JSX node; overrides label prop)
     */
    children         : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className        : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
     * Display as hover when required from another component
     */
    forceHover       : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError         : PropTypes.bool,
    /**
     *  HTML id attribute (override default)
     */
    id               : PropTypes.string,
    /**
     * Callback that receives the native <input>: ( ref ) => { ... }
     */
    inputRef         : PropTypes.func,
    /**
     *  Display as checked (controlled input)
     */
    isChecked        : PropTypes.bool,
    /**
     *  Display as checked by default (uncontrolled input)
     */
    isDefaultChecked : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled       : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly       : PropTypes.bool,
    /**
     *  Label content (string)
     */
    label            : PropTypes.string,
    /**
     *  Checkbox group name
     */
    name             : PropTypes.string,
    /**
     *  OnChange callback function: ( e ) => { ... }
     */
    onChange         : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut       : PropTypes.func,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver      : PropTypes.func,
    /**
     *  Input type
     */
    type             : PropTypes.oneOf( [ 'checkbox', 'radio' ] ),
    /**
     *  HTML value attribute
     */
    value            : PropTypes.string,
};

Checkable.defaultProps =
{
    children         : undefined,
    className        : undefined,
    cssMap           : undefined,
    forceHover       : false,
    hasError         : false,
    id               : undefined,
    inputRef         : undefined,
    isDefaultChecked : false,
    isDisabled       : false,
    isChecked        : undefined,
    isReadOnly       : false,
    label            : undefined,
    name             : undefined,
    onChange         : undefined,
    onMouseOut       : undefined,
    onMouseOver      : undefined,
    type             : 'checkbox',
    value            : undefined,
};

export default Checkable;
