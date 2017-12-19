import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const Row = ( {
    align,
    verticalAlign,
    children,
    className,
    cssMap,
    gutters,
    hasMinHeight,
    role,
    spacing } ) =>

        <Css
            cssMap   = { cssMap }
            cssProps = { {
                alignX  : align,
                alignY  : verticalAlign,
                hasMinHeight,
                gutters : gutters !== 'none' && gutters,
                spacing : spacing !== 'none' && spacing

            } }>
            <div
                className = { className }
                role      = { role }>
                { children }
            </div>
        </Css>;

Row.propTypes =
{
    /**
     * Horizontal alignment of the columns (“auto” makes all columns equal
     * width)
     */
    align : PropTypes.oneOf( [
        'auto',
        'left',
        'center',
        'right'
    ] ),
    /**
    *  Set minimum height equal to average row.
    */
    hasMinHeight  : PropTypes.bool,
    /**
     * Vertical alignment of the columns (“auto” makes all columns equal
     * height)
     */
    verticalAlign : PropTypes.oneOf( [
        'auto',
        'top',
        'middle',
        'bottom'
    ] ),
    /**
     *  Gutter size
     */
    gutters : PropTypes.oneOf( [
        'none',
        'S',
        'M',
        'L'
    ] ),
    /**
     *  Row spacing
     */
    spacing : PropTypes.oneOf( [
        'none',
        'default',
        'h1',
        'h2',
        'h3',
        'h4',
        'label'
    ] ),
    /**
     *  Row role
     */
    role     : PropTypes.string,
    /**
     *  Row content (Columns)
     */
    children : PropTypes.node
};

Row.defaultProps =
{
    align         : 'auto',
    hasMinHeight  : false,
    verticalAlign : 'auto',
    spacing       : 'default',
    gutters       : 'L',
    cssMap        : require( './row.css' )
};

export default Row;
