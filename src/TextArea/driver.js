/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { InputField } from 'nessie-ui';

const ERR = {
    TEXTAREA_ERR : ( event, state ) =>
        `TextArea cannot simulate ${event} since it is ${state}`,
};

export default class TextAreaDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'blur', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'click', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().click();
        return this;
    }

    change( val, input = 'textarea' )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'change', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().change( val, input );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'focus', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    keyPress( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().keyPress( keyCode );
        return this;
    }

    keyUp( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'keyUp', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().keyUp( keyCode );
        return this;
    }

    keyDown( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'keyDown', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().keyDown( keyCode );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
