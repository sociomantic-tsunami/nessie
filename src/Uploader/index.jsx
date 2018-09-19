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

import { generateId, buildClassName } from '../utils';
import Button                         from '../Button';
import IconWithTooltip                from '../IconWithTooltip';
import Spinner                        from '../Spinner';
import IconButton                     from '../IconButton';
import Tooltip                        from '../Tooltip';
import Label                          from '../Label';
import styles                         from './uploader.css';


const Uploader = ( {
    buttonLabel,
    className,
    cssMap,
    errorMessage,
    errorMessagePosition,
    hasError,
    hasWarning,
    id = generateId( 'Uploader' ),
    inputRef,
    isDisabled,
    isReadOnly,
    label,
    onChange,
    onClick,
    onClickSecondary,
    onMouseOut,
    onMouseOver,
    previewIsDisabled,
    previewTooltipIsVisible,
    previewTooltipMessage,
    tooltipIsVisible,
    uploadState,
    warningMessage,
} ) =>
{
    let hasTooltip = false;
    let iconType   = 'upload';
    let isLoading  = false;
    let uploaded   = false;

    let uploaderButtonClass = cssMap.uploadButton;
    let messageType;
    let message;

    if ( uploadState === 'uploading' )
    {
        iconType  = 'none';
        isLoading = true;
        uploaderButtonClass = cssMap.uploaderButton;
    }
    else if ( uploadState === 'uploaded' )
    {
        iconType  = 'none';
        isLoading = false;
        uploaded  = true;
        uploaderButtonClass = cssMap.uploaderButton;
    }

    if ( hasWarning )
    {
        hasTooltip  = true;
        message     = warningMessage;
        messageType = 'alert';
    }
    if ( hasError )
    {
        hasTooltip  = true;
        message     = errorMessage;
        messageType = 'error';
    }

    return (
        <div
            className = { buildClassName( className, cssMap, {
                disabled        : isDisabled,
                loading         : isLoading,
                previewDisabled : previewIsDisabled,
                uploaded,
            } ) }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut } >
            <input
                className = { cssMap.input }
                name      = { `${id}-file` }
                onChange  = { onChange }
                ref       = { inputRef }
                tabIndex  = "-1"
                type      = "file" />
            { label &&
            <Label
                htmlFor    = { `${id}-file` }
                isDisabled = { isDisabled }
                overflowIsHidden>
                { label }
            </Label>
            }
            <IconWithTooltip
                className        = { cssMap.iconWithTooltip }
                iconIsVisible    = { hasTooltip }
                iconPosition     = "topRight"
                iconType         = { messageType }
                message          = { message }
                noWarn
                tooltipIsVisible = { tooltipIsVisible }
                tooltipPosition  = { errorMessagePosition }>
                <div className = { cssMap.buttonsContainer }>
                    <Tooltip
                        className = { cssMap.previewTooltip }
                        isVisible = { uploadState ===
                            'uploaded' && previewTooltipIsVisible }
                        message = { previewTooltipMessage }
                        noWarn>
                        <Button
                            className  = { uploaderButtonClass }
                            iconType   = { iconType }
                            isDisabled = { isDisabled }
                            isReadOnly = { isReadOnly }
                            onClick    = { onClick }
                            role       = "default">
                            { buttonLabel }
                        </Button>
                    </Tooltip>
                    { isLoading &&
                        <div className = { cssMap.loadingOverlay }>
                            <Spinner className = { cssMap.spinner } />
                        </div>
                    }
                    { uploaded &&
                    <IconButton
                        className  = { cssMap.uploadedButton }
                        iconTheme  = "button"
                        iconType   = "delete"
                        isDisabled = { isDisabled }
                        isReadOnly = { isReadOnly }
                        onClick    = { onClickSecondary } />
                    }
                </div>
            </IconWithTooltip>
        </div>
    );
};

Uploader.propTypes =
{
    /**
     *  “Upload” Button text
     */
    buttonLabel          : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap               : PropTypes.objectOf( PropTypes.string ),
    /**
    *  Tooltip error message text (string or JSX)
    */
    errorMessage         : PropTypes.node,
    /**
    *  Error message position relative to the icon
    */
    errorMessagePosition : PropTypes.oneOf( [
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
    *  Display as error/invalid
    */
    hasError                : PropTypes.bool,
    /**
    *  Display as warning ( adds warning icon )
    */
    hasWarning              : PropTypes.bool,
    /**
     * HTML id attribute
     */
    id                      : PropTypes.string,
    /**
     * callback that receives ref to native input: ( ref ) => { ... }
     */
    inputRef                : PropTypes.func,
    /**
    *  Display as disabled
    */
    isDisabled              : PropTypes.bool,
    /**
    *  Display as read-only
    */
    isReadOnly              : PropTypes.bool,
    /**
     *  Label text
     */
    label                   : PropTypes.string,
    /**
     * onChange callback function: ( e ) => { ... }
     */
    onChange                : PropTypes.func,
    /**
     * onClick callback function: ( e ) => { ... }
     */
    onClick                 : PropTypes.func,
    /**
     * onClickSecondary callback function: ( e ) => { ... }
     */
    onClickSecondary        : PropTypes.func,
    /**
     * onMouseOut callback function: ( e ) => { ... }
     */
    onMouseOut              : PropTypes.func,
    /**
     * onMouseOver callback function: ( e ) => { ... }
     */
    onMouseOver             : PropTypes.func,
    /**
     * Preview button is disabled
     */
    previewIsDisabled       : PropTypes.bool,
    /**
     * Preview tootltip is visible
     */
    previewTooltipIsVisible : PropTypes.bool,
    /**
     * Preview tootltip messsage text (string or JSX)
     */
    previewTooltipMessage   : PropTypes.node,
    /**
     * Error or warning tooltip is visible
     */
    tooltipIsVisible        : PropTypes.bool,
    /**
    *  Uploader state
    */
    uploadState             : PropTypes.oneOf( [
        'default',
        'uploading',
        'uploaded',
    ] ),
    /**
    *  Tooltip warning message text (string or JSX)
    */
    warningMessage : PropTypes.node,
};

Uploader.defaultProps =
{
    buttonLabel             : 'Upload',
    cssMap                  : styles,
    errorMessage            : undefined,
    errorMessagePosition    : 'top',
    hasError                : false,
    hasWarning              : false,
    id                      : undefined,
    inputRef                : undefined,
    isDisabled              : false,
    isReadOnly              : false,
    label                   : undefined,
    onChange                : undefined,
    onClick                 : undefined,
    onClickSecondary        : undefined,
    onMouseOut              : undefined,
    onMouseOver             : undefined,
    previewIsDisabled       : undefined,
    previewTooltipIsVisible : false,
    previewTooltipMessage   : undefined,
    tooltipIsVisible        : false,
    uploadState             : 'default',
    warningMessage          : undefined,
};

export default Uploader;
