/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                          from 'react';
import PropTypes                      from 'prop-types';

import { buildClassName }             from '../utils';
import styles                         from './datePicker.css';
import DatePickerItem                 from './DatePickerItem';
import DatePickerHeader               from './DatePickerHeader';


const DatePicker = ( {
    className,
    cssMap,
    month,
    year,
    headers,
    hourIsDisabled,
    hourIsReadOnly,
    hourPlaceholder,
    hourValue,
    isDisabled,
    isReadOnly,
    items,
    label,
    minuteIsDisabled,
    minuteIsReadOnly,
    minutePlaceholder,
    minuteValue,
    mode,
    nextIsDisabled,
    nextIsReadOnly,
    onBlur,
    onChange,
    onFocus,
    onKeyPress,
    onClickItem,
    onClickNext,
    onClickPrev,
    prevIsDisabled,
    prevIsReadOnly,
    type,
} ) => (
    <div className = { buildClassName( className, cssMap ) }>
        <DatePickerHeader
            isDisabled        = { isDisabled }
            isReadOnly        = { isReadOnly }
            label             = { label }
            month             = { month }
            year              = { year }
            nextIsDisabled    = { nextIsDisabled }
            nextIsReadOnly    = { nextIsReadOnly }
            onClickNext       = { onClickNext }
            onClickPrev       = { onClickPrev }
            prevIsDisabled    = { prevIsDisabled }
            prevIsReadOnly    = { prevIsReadOnly }
            hourIsDisabled    = { hourIsDisabled }
            hourIsReadOnly    = { hourIsReadOnly }
            hourPlaceholder   = { hourPlaceholder }
            hourValue         = { hourValue }
            minuteIsDisabled  = { minuteIsDisabled }
            minuteIsReadOnly  = { minuteIsReadOnly }
            minutePlaceholder = { minutePlaceholder }
            minuteValue       = { minuteValue }
            mode              = { mode }
            onBlur            = { onBlur }
            onChange          = { onChange }
            onFocus           = { onFocus }
            onKeyPress        = { onKeyPress } />

        { items &&
            <table className = { cssMap.calendar }>
                { headers &&
                    <thead className = { cssMap.calendarHeader }>
                        <tr>
                            { headers.map( ( header, i ) =>
                                <th key = { i }>
                                    <span title = { header.title }>
                                        { header.label }
                                    </span>
                                </th>
                            ) }
                        </tr>
                    </thead>
                }
                <tbody>
                    { items.map( ( item, i ) =>
                        <tr key = { i }>
                            { item.map( ( item, j ) =>
                                <td key = { j }>
                                    { item.value &&
                                        <DatePickerItem
                                            { ...item }
                                            onClick = { onClickItem }
                                            type    = { type } />
                                    }
                                </td>
                            ) }
                        </tr>
                    ) }
                </tbody>
            </table>
        }
    </div>
);

DatePicker.propTypes = {
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    headers   : PropTypes.arrayOf(
        PropTypes.objectOf( PropTypes.string ) ),
    hourIsDisabled  : PropTypes.bool,
    hourIsReadOnly  : PropTypes.bool,
    hourPlaceholder : PropTypes.string,
    hourValue       : PropTypes.string,
    isDisabled      : PropTypes.bool,
    isReadOnly      : PropTypes.bool,
    items           : PropTypes.arrayOf(
        PropTypes.arrayOf( PropTypes.object ) ),
    label             : PropTypes.string,
    minuteIsDisabled  : PropTypes.bool,
    minuteIsReadOnly  : PropTypes.bool,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,
    mode              : PropTypes.oneOf( [ 'default', 'date', 'month' ] ),
    month             : PropTypes.string,
    nextIsDisabled    : PropTypes.bool,
    nextIsReadOnly    : PropTypes.bool,
    onBlur            : PropTypes.func,
    onChange          : PropTypes.func,
    onClickItem       : PropTypes.func,
    onClickNext       : PropTypes.func,
    onClickPrev       : PropTypes.func,
    onFocus           : PropTypes.func,
    onKeyPress        : PropTypes.func,
    prevIsDisabled    : PropTypes.bool,
    prevIsReadOnly    : PropTypes.bool,
    type              : PropTypes.oneOf( [ 'day', 'month' ] ),
    year              : PropTypes.string,
};

DatePicker.defaultProps = {
    className         : undefined,
    cssMap            : styles,
    headers           : undefined,
    hourIsDisabled    : false,
    hourIsReadOnly    : false,
    hourPlaceholder   : undefined,
    hourValue         : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    items             : undefined,
    label             : undefined,
    minuteIsDisabled  : false,
    minutePlaceholder : undefined,
    minuteValue       : undefined,
    mode              : 'default',
    month             : undefined,
    nextIsDisabled    : false,
    nextIsReadOnly    : false,
    onBlur            : undefined,
    onChange          : undefined,
    onClickItem       : undefined,
    onClickNext       : undefined,
    onClickPrev       : undefined,
    onFocus           : undefined,
    onKeyPress        : undefined,
    prevIsDisabled    : false,
    prevIsReadOnly    : false,
    type              : 'day',
    year              : undefined,
};

export default DatePicker;
