import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Text                 from '../Text';

const MessageBox = ( {
    cssMap,
    className,
    children,
    message,
    messageType } ) =>
        <Css
            cssMap   = { cssMap }
            cssProps = { { type: messageType } }>
            <div className = { className }>
                { ( children || message ) &&
                    <Text>{ message }</Text>
                }
            </div>
        </Css>;

MessageBox.propTypes =
{
    /**
    *  Message text
    */
    message     : PropTypes.string,
    /**
    *  Message type
    */
    messageType : PropTypes.oneOf( [ 'alert', 'info', 'error', 'success' ] )
};

MessageBox.defaultProps =
{
    messageType : 'info',
    cssMap      : require( './messageBox.css' )
};

export default MessageBox;