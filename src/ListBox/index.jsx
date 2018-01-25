/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React        from 'react';
import PropTypes    from 'prop-types';

import {
    buildOptions,
    updateOptions,
} from './utils';
import {
    buildClassName,
    generateId,
    killFocus,
    mapAria,
} from '../utils';
import styles from './listBox.css';


const ListBox = ( {
    aria,
    activeOption,
    children,
    className,
    cssMap,
    isFocusable,
    isMultiselect,
    id = generateId( 'ListBox' ),
    onClickOption,
    onMouseOutOption,
    onMouseOverOption,
    onKeyPress,
    options,
    selection,
} ) => (
    <ul
        { ...mapAria( {
            ...aria,
            activeDescendant : isFocusable ? activeOption : null,
            multiSelectable  : isMultiselect,
            role             : 'listbox',
        } ) }
        className   = { buildClassName( className, cssMap ) }
        id          = { id }
        onKeyPress  = { onKeyPress }
        onMouseDown = { !isFocusable && killFocus }
        tabIndex    = { isFocusable ? '0' : '-1' }>
        { updateOptions( children || buildOptions( options ),
            {
                activeOption,
                onClickOption,
                onMouseOutOption,
                onMouseOverOption,
                selection,
            } )
        }
    </ul>
);


ListBox.propTypes = {
    aria              : PropTypes.objectOf( PropTypes.string ),
    activeOption      : PropTypes.string,
    children          : PropTypes.node,
    className         : PropTypes.string,
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    isFocusable       : PropTypes.bool,
    isMultiselect     : PropTypes.bool,
    id                : PropTypes.string,
    options           : PropTypes.arrayOf( PropTypes.object ),
    onClickOption     : PropTypes.func,
    onMouseOutOption  : PropTypes.func,
    onMouseOverOption : PropTypes.func,
    onKeyPress        : PropTypes.func,
    selection         : PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.arrayOf( PropTypes.string ),
    ] ),
};

ListBox.defaultProps = {
    aria              : undefined,
    activeOption      : undefined,
    children          : undefined,
    className         : undefined,
    cssMap            : styles,
    isFocusable       : true,
    isMultiselect     : false,
    id                : undefined,
    options           : undefined,
    onClickOption     : undefined,
    onMouseOutOption  : undefined,
    onMouseOverOption : undefined,
    onKeyPress        : undefined,
    selection         : undefined,
};

export default ListBox;
