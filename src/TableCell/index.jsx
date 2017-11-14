import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Column               from '../Column';
import Text                 from '../Text';
import Sorter               from '../Sorter';

const TableCell = ( {
    align,
    children,
    className,
    columnTitle,
    cssMap,
    isHeader,
    isRowHeader,
    isDataTable,
    isSortable,
    isSticky,
    isStickyFixed,
    onToggle,
    size,
    sort,
    verticalAlign } ) =>
{
    let contentNode = typeof children === 'string' ?
        <Text>{ children }</Text> : children;

    if ( isHeader && isSortable )
    {
        contentNode = (
            <Sorter
                sort     = { sort }
                onToggle = { onToggle }>
                { contentNode }
            </Sorter>
        );
    }

    return (
        <Css
            cssMap   = { cssMap }
            cssProps = { {
                header      : isHeader,
                rowHeader   : isRowHeader,
                data        : isDataTable,
                sticky      : isSticky,
                stickyFixed : isStickyFixed
            } }>
            <Column
                className     = { className }
                size          = { size }
                role          = { isHeader ? 'columnheader' : 'gridcell' }
                columnTitle   = { columnTitle }
                align         = { align }
                verticalAlign = { verticalAlign }>
                { contentNode }
            </Column>
        </Css>
    );
};
TableCell.propTypes =
{
    /**
     *  Title of the column this cell in
     */
    columnTitle : PropTypes.string,
    /**
     *  Display as a header cell
     */
    isHeader    : PropTypes.bool,
    /**
     *  Display as a row header cell
     */
    isRowHeader : PropTypes.bool,
    /**
     *  Show a Sorter in header cell
     */
    isSortable  : PropTypes.bool,
    /**
     *  Makes the cell sticky
     */
    isSticky    : PropTypes.bool,
    /**
     *  Sort direction
     */
    sort        : PropTypes.oneOf( [
        'asc',
        'desc',
        'none'
    ] ),
    /**
     *  Is Data Table (smaller fonts, zebra paddings)
     */
    isDataTable : PropTypes.bool,

    /**
     *  Size of the cell
     */
    size : PropTypes.oneOf( [ '1/1',
        '1/2', '2/2',
        '1/3', '2/3', '3/3',
        '1/4', '2/4', '3/4', '4/4',
        '1/5', '2/5', '3/5', '4/5', '5/5',
        '1/6', '2/6', '3/6', '4/6', '5/6', '6/6',
        '1/7', '2/7', '3/7', '4/7', '5/7', '6/7', '7/7',
        '1/8', '2/8', '3/8', '4/8', '5/8', '6/8', '7/8', '8/8',
        '1/9', '2/9', '3/9', '4/9', '5/9', '6/9', '7/9', '8/9', '9/9',
        /* eslint-disable max-len */
        '1/10', '2/10', '3/10', '4/10', '5/10', '6/10', '7/10', '8/10', '9/10', '10/10',
        '1/11', '2/11', '3/11', '4/11', '5/11', '6/11', '7/11', '8/11', '9/11', '10/11', '11/11',
        '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12', '8/12', '9/12', '10/12', '11/12', '12/12',
        '1/14', '2/13', '3/13', '4/13', '5/13', '6/13', '7/13', '8/13', '9/13', '10/13', '11/13', '12/13', '13/13',
        '1/14', '2/14', '3/14', '4/14', '5/14', '6/14', '7/14', '8/14', '9/14', '10/14', '11/14', '12/14', '13/14', '14/14',
        '1/15', '2/15', '3/15', '4/15', '5/15', '6/15', '7/15', '8/15', '9/15', '10/15', '11/15', '12/15', '13/15', '14/15', '15/15',
        '1/17', '2/17', '3/16', '4/16', '5/16', '6/16', '7/16', '8/16', '9/16', '10/16', '11/16', '12/16', '13/16', '14/16', '15/16', '16/16',
        '1/17', '2/17', '3/17', '4/17', '5/17', '6/17', '7/17', '8/17', '9/17', '10/17', '11/17', '12/17', '13/17', '14/17', '15/17', '16/17', '17/17',
        '1/18', '2/18', '3/18', '4/18', '5/18', '6/18', '7/18', '8/18', '9/18', '10/18', '11/18', '12/18', '13/18', '14/18', '15/18', '16/18', '17/18', '18/18',
        '1/19', '2/19', '3/19', '4/19', '5/19', '6/19', '7/19', '8/19', '9/19', '10/19', '11/19', '12/19', '13/19', '14/19', '15/19', '16/19', '17/19', '18/19', '19/19',
        '1/20', '2/20', '3/20', '4/20', '5/20', '6/20', '7/20', '8/20', '9/20', '10/20', '11/20', '12/20', '13/20', '14/20', '15/20', '16/20', '17/20', '18/20', '19/20', '20/20',
        '1/21', '2/21', '3/21', '4/21', '5/21', '6/21', '7/21', '8/21', '9/21', '10/21', '11/21', '12/21', '13/21', '14/21', '15/21', '16/21', '17/21', '18/21', '19/21', '20/21', '21/21',
        '1/22', '2/22', '3/22', '4/22', '5/22', '6/22', '7/22', '8/22', '9/22', '10/22', '11/22', '12/22', '13/22', '14/22', '15/22', '16/22', '17/22', '18/22', '19/22', '20/22', '21/22', '22/22',
        '1/23', '2/23', '3/23', '4/23', '5/23', '6/23', '7/23', '8/23', '9/23', '10/23', '11/23', '12/23', '13/23', '14/23', '15/23', '16/23', '17/23', '18/23', '19/23', '20/23', '21/23', '22/23', '23/23',
        '1/24', '2/24', '3/24', '4/24', '5/24', '6/24', '7/24', '8/24', '9/24', '10/24', '11/24', '12/24', '13/24', '14/24', '15/24', '16/24', '17/24', '18/24', '19/24', '20/24', '21/24', '22/24', '23/24', '24/24',
        'content'
        /* eslint-enable max-len */
    ] ),
    /**
     *  Horizontal alignment of content (“auto” makes all items 100% width)
     */
    align : PropTypes.oneOf( [
        'auto',
        'left',
        'center',
        'right'
    ] ),
    /**
     *  Vertical alignment of content (“auto” is equivalent to “top”)
     */
    verticalAlign : PropTypes.oneOf( [
        'auto',
        'top',
        'middle',
        'bottom'
    ] ),
    /**
     *  Cell content
     */
    children : PropTypes.node,
    /**
     *  Sorter onToggle callback function: ( e ) => { ... }
     */
    onToggle : PropTypes.func
};

TableCell.defaultProps =
{
    isHeader    : false,
    isRowHeader : false,
    isDataTable : false,
    isSortable  : false,
    isSticky    : false,
    cssMap      : require( './tableCell.css' )
};

export default TableCell;
