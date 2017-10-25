import React                                from 'react';
import PropTypes                            from 'prop-types';

import { Column, IconButton, Row, Text }    from '../index';
import { buildClassName }                   from '../utils';
import styles                               from './datePickerHeader.css';

const DatePickerHeader = ( {
    className,
    cssMap,
    label,
    isDisabled,
    isReadOnly,
    nextIsDisabled,
    onClickNext,
    onClickPrev,
    prevIsDisabled,
} ) => (
    <div className = { buildClassName( className, cssMap ) }>
        <IconButton
            className  = { cssMap.prev }
            iconType   = "left"
            isDisabled = { prevIsDisabled }
            onClick    = { onClickPrev } />
        <Text className = { cssMap.date }>
            { label }
        </Text>
        <IconButton
            className  = { cssMap.next }
            iconType   = "right"
            isDisabled = { nextIsDisabled }
            onClick    = { onClickPrev } />
    </div>
);

DatePickerHeader.propTypes = {
    className      : PropTypes.string,
    cssMap         : PropTypes.objectOf( PropTypes.string ),
    label          : PropTypes.string,
    isDisabled     : PropTypes.bool,
    isReadOnly     : PropTypes.bool,
    nextIsDisabled : PropTypes.bool,
    onClickNext    : PropTypes.bool,
    onClickPrev    : PropTypes.bool,
    prevIsDisabled : PropTypes.bool,
};

DatePickerHeader.defaultProps = {
    className      : undefined,
    cssMap         : styles,
    label          : undefined,
    isDisabled     : undefined,
    isReadOnly     : undefined,
    nextIsDisabled : undefined,
    onClickNext    : undefined,
    onClickPrev    : undefined,
    prevIsDisabled : undefined,
};

export default DatePickerHeader;
