/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { useState }                from 'react';
import PropTypes                          from 'prop-types';
import moment                             from 'moment';
import _                                  from 'lodash';

import copy                               from './copy.json';
import DatePickerItem                     from './DatePickerItem';
import DatePickerHeader                   from './DatePickerHeader';
import { attachEvents, useThemeClasses }  from '../utils';


const DAY_LABELS = _.range( 0, 7 ).map( day => ( {
    label : copy.dayHeaders[ day ],
} ) );


/**
 * returns utc of the timestamp passed
 *
 * @param {Number} timestamp passed
 *
 * @return {Number} UTC timestamp
 */
function $m( timestamp )
{
    return moment( timestamp ).utc();
}

/**
 * checks if 2 timestamp are equal
 *
 * @param {Number}  ts1 timestamp
 * @param {Number}  ts2 timestamp
 * @param {String}  precision precision to compare
 *
 * @return {Boolean}
 */
function isTimestampEqual( ts1, ts2, precision )
{
    return $m( ts1 ).isSame( $m( ts2 ), precision );
}

/**
 * Timestamp conversion to Human time ( hours )
 *
 * @param {Number}  timestamp timestamp
 *
 * @return {String} human readable time ( hours )
 */
function formatHours( timestamp )
{
    if ( !_.isNumber( timestamp ) ) return '';
    return $m( timestamp ).format( 'HH' );
}

/**
 * Timestamp conversion to Human time ( minutes )
 *
 * @param {Number}  timestamp timestamp
 *
 * @return {String} human readable time ( minutes )
 */
function formatMinutes( timestamp )
{
    if ( !_.isNumber( timestamp ) ) return '';
    return $m( timestamp ).format( 'mm' );
}

/**
 * Timestamp conversion to week number
 *
 * @param {Number}  timestamp timestamp
 *
 * @return {String} week number
 */
function formatWeeks( timestamp )
{
    if ( !_.isNumber( timestamp ) ) return '';
    return $m( timestamp ).week();
}


const useTimestamp = ( defaultValue = Date.now(), value ) =>
{
    const [ timestamp, setTimestamp ] = useState( defaultValue );

    const setter = ( newValue ) =>
    {
        if ( value === undefined )
        {
            setTimestamp( newValue );
        }
    };

    return [ value || timestamp, setter ];
};


const componentName = 'DatePicker';

const DatePicker = props =>
{
    const [ timestamp, setTimestamp ] = useTimestamp(
        props.defaultValue,
        props.value,
    );
    const [ gridStartState, setGridStartState ] = useState( null );
    const [ hourValue, setHourValue ] = useState( undefined );
    const [ minuteValue, setMinuteValue ] = useState( undefined );

    const cssMap = useThemeClasses( componentName, props );


    const gridStartTimestamp = gridStartState || $m( timestamp )
        .startOf( props.type === 'month' ? 'year' : 'month' )
        .valueOf();

    const isUnitSelectable = (
        itemTimestamp,
        unit,
    ) =>
    {
        const { max } = props;
        const min = props.min || Date.now();

        if ( itemTimestamp > max ) return false;

        return $m( itemTimestamp ).add( 1, unit ) > min;
    };


    const dayMatrix = () =>
    {
        const startMonth = gridStartTimestamp;

        if ( !startMonth ) return;

        const offset = ( $m( startMonth ).weekday() + 6 ) % 7;
        const daysInMonth = $m( startMonth ).daysInMonth();

        const days = _.range( -offset, daysInMonth ).map( dayIndex =>
        {
            const hasDate = dayIndex >= 0 && dayIndex < daysInMonth;
            const label = hasDate ? String( dayIndex + 1 ) : '';
            const value = hasDate ?
                $m( startMonth ).add( dayIndex, 'day' ).valueOf() : null;

            const isDisabled = hasDate && !isUnitSelectable(
                value,
                'day',
            );

            const isCurrent = hasDate &&
                isTimestampEqual( value, Date.now(), 'day' );
            const isSelected = hasDate && _.isNumber( timestamp ) &&
                isTimestampEqual( timestamp, value, 'day' );
            return {
                label,
                value,
                isCurrent,
                isDisabled,
                isSelected,
            };
        } );

        return _.chunk( days, 7 );
    };

    const weekMatrix = () =>
    {
        const startWeek = gridStartTimestamp;

        if ( !startWeek ) return;

        // first day of a month
        const firstWeek = formatWeeks( gridStartTimestamp );
        // last day of a month
        const lastWeek = formatWeeks( $m( gridStartTimestamp )
            .endOf( 'month' ).valueOf() );

        const weeks = _.range( firstWeek, lastWeek ).map( weekIndex =>
        {
            const label = weekIndex;
            const value = $m( firstWeek ).add( weekIndex, 'week' ).valueOf();

            const isDisabled = !isUnitSelectable(
                value,
                'week',
            );

            const isCurrent = isTimestampEqual( value, Date.now(), 'day' );
            const isSelected = _.isNumber( timestamp ) &&
              isTimestampEqual( timestamp, value, 'day' );
            return {
                label,
                value,
                isCurrent,
                isDisabled,
                isSelected,
            };
        } );

        return _.chunk( weeks, 1 );
    };
    console.log( weekMatrix() );
    const monthMatrix = () =>
    {
        const startYear = gridStartTimestamp;

        if ( !startYear ) return;

        const months = _.range( 0, 12 ).map( month =>
        {
            const label = copy.shortMonths[ month ];
            const value = $m( startYear ).add( month, 'month' ).valueOf();

            const isDisabled = !isUnitSelectable( value, 'month' );

            const isCurrent = isTimestampEqual( value, Date.now(), 'month' );
            const isSelected = _.isNumber( timestamp ) &&
                isTimestampEqual( timestamp, value, 'month' );
            return {
                label,
                value,
                isCurrent,
                isDisabled,
                isSelected,
            };
        } );

        return _.chunk( months, 4 );
    };


    const monthLabel = copy.months[ $m( gridStartTimestamp ).month() ];

    const yearLabel = $m( gridStartTimestamp ).year().toString();


    const canGotoNext = () =>
    {
        const { max } = props;
        const nextGridStart = $m( gridStartTimestamp )
            .add( 1, props.type === 'month' ? 'year' : 'month' ).valueOf();

        return !_.isNumber( max ) || ( nextGridStart <= max );
    };


    const canGotoPrev = () =>
    {
        const min = props.min || Date.now();
        const prevGridStart = $m( gridStartTimestamp )
            .add( -1, props.type === 'month' ? 'year' : 'month' )
            .valueOf();
        const endOfPrev = $m( prevGridStart )
            .add( 1, props.type === 'month' ? 'year' : 'month' )
            .valueOf();

        return !_.isNumber( min ) || endOfPrev > min;
    };


    const handleClickNext = () =>
    {
        if ( !canGotoNext() ) return;

        setGridStartState( $m( gridStartTimestamp )
            .add( 1, props.type === 'month' ? 'year' : 'month' )
            .valueOf() );
    };


    const handleClickPrev = () =>
    {
        if ( !canGotoPrev() ) return;

        setGridStartState( $m( gridStartTimestamp )
            .add( -1, props.type === 'month' ? 'year' : 'month' )
            .valueOf() );
    };


    const handleChangeHour = ( { value } ) =>
    {
        const trimmed = value.trim().replace( /\s+/g, ' ' );
        let digits = Number( trimmed );

        setHourValue( value );

        if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 23 )
        {
            const newTimestamp = $m( timestamp ).set( 'hour', digits )
                .valueOf();

            setTimestamp( newTimestamp );

            if ( typeof onChange === 'function' )
            {
                onChange( { value: newTimestamp } );
            }
        }
        else
        {
            digits = _.isNumber( timestamp ) && $m( timestamp ).hour();

            if ( !_.isNaN( digits ) )
            {
                const newTimestamp = $m( timestamp ).set( 'hour', digits )
                    .valueOf();

                setTimestamp( newTimestamp );

                if ( typeof onChange === 'function' )
                {
                    onChange( { value: newTimestamp } );
                }
            }
        }
    };


    const handleChangeMinute = ( { value } ) =>
    {
        const trimmed = value.trim().replace( /\s+/g, ' ' );
        let digits = Number( trimmed );

        setMinuteValue( value );

        if ( /^\d\d?$/.test( trimmed ) && digits >= 0 && digits <= 59 )
        {
            const newTimestamp = $m( timestamp ).set( 'minute', digits )
                .valueOf();

            setTimestamp( newTimestamp );

            if ( typeof onChange === 'function' )
            {
                onChange( { value: newTimestamp } );
            }
        }
        else
        {
            digits = _.isNumber( timestamp ) && $m( timestamp ).minute();

            if ( !_.isNaN( digits ) )
            {
                const newTimestamp = $m( timestamp ).set( 'minute', digits )
                    .valueOf();

                setTimestamp( newTimestamp );

                if ( typeof onChange === 'function' )
                {
                    onChange( { value: newTimestamp } );
                }
            }
        }
    };


    const handleClickItem = ( { value } ) =>
    {
        setTimestamp( value );

        if ( typeof onChange === 'function' )
        {
            onChange( { value } );
        }
    };


    const {
        hasTimeInput,
        hourIsDisabled,
        hourIsReadOnly,
        hourPlaceholder,
        isDisabled,
        isReadOnly,
        minuteIsDisabled,
        minuteIsReadOnly,
        minutePlaceholder,
        type,
        onChange,
        ...restProps
    } = props;

    const headers = type !== 'month' && DAY_LABELS;

    const items = type === 'month' ? monthMatrix() : dayMatrix();

    const weeks = type === 'weeks' ? weekMatrix() : undefined;

    return (
        <div { ...attachEvents( restProps ) } className = { cssMap.main }>
            <DatePickerHeader
                hasTimeInput      = { hasTimeInput }
                hourIsDisabled    = { hourIsDisabled }
                hourIsReadOnly    = { hourIsReadOnly }
                hourPlaceholder   = { hourPlaceholder }
                hourValue         = { hourValue || formatHours( timestamp ) }
                isDisabled        = { isDisabled }
                isReadOnly        = { isReadOnly }
                minuteIsDisabled  = { minuteIsDisabled }
                minuteIsReadOnly  = { minuteIsReadOnly }
                minutePlaceholder = { minutePlaceholder }
                minuteValue       = { minuteValue ||
                    formatMinutes( timestamp ) }
                month             = { monthLabel }
                nextIsDisabled    = { !canGotoNext() }
                onChangeHour      = { handleChangeHour }
                onChangeMinute    = { handleChangeMinute }
                onClickNext       = { handleClickNext }
                onClickPrev       = { handleClickPrev }
                prevIsDisabled    = { !canGotoPrev() }
                year              = { yearLabel } />

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
                                    </th> ) }
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
                                                onClick = { handleClickItem }
                                                type    = { type } />
                                        }
                                    </td> ) }
                            </tr> ) }
                    </tbody>
                </table>
            }
        </div>
    );
};

DatePicker.propTypes = {
    className    : PropTypes.string,
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    defaultValue : PropTypes.number,
    headers      : PropTypes.arrayOf( PropTypes
        .objectOf( PropTypes.string ) ),
    hourIsDisabled    : PropTypes.bool,
    hourIsReadOnly    : PropTypes.bool,
    hourPlaceholder   : PropTypes.string,
    hourValue         : PropTypes.string,
    isDisabled        : PropTypes.bool,
    isReadOnly        : PropTypes.bool,
    hasTimeInput      : PropTypes.bool,
    max               : PropTypes.number,
    min               : PropTypes.number,
    minuteIsDisabled  : PropTypes.bool,
    minuteIsReadOnly  : PropTypes.bool,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,
    onChange          : PropTypes.func,
    onChangeHour      : PropTypes.func,
    onChangeMinute    : PropTypes.func,
    onClickItem       : PropTypes.func,
    onClickNext       : PropTypes.func,
    onClickPrev       : PropTypes.func,
    type              : PropTypes.oneOf( [ 'day', 'month' ] ),
    value             : PropTypes.number,
};

DatePicker.defaultProps = {
    className         : undefined,
    cssMap            : undefined,
    defaultValue      : undefined,
    hasTimeInput      : true,
    headers           : undefined,
    hourIsDisabled    : false,
    hourIsReadOnly    : false,
    hourPlaceholder   : undefined,
    hourValue         : undefined,
    isDisabled        : false,
    isReadOnly        : false,
    max               : undefined,
    min               : undefined,
    minuteIsDisabled  : false,
    minuteIsReadOnly  : false,
    minutePlaceholder : undefined,
    minuteValue       : undefined,
    onChange          : undefined,
    onChangeHour      : undefined,
    onChangeMinute    : undefined,
    onClickItem       : undefined,
    onClickNext       : undefined,
    onClickPrev       : undefined,
    type              : 'day',
    value             : undefined,
};

DatePicker.displayName = componentName;

export default DatePicker;
