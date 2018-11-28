/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const ERR = {
    SLIDER_ERR : ( label, action, state ) =>
        `Slider ${label ? `'${label}'` : ''} cannot ${action} since it is \
${state}`,
};

export default class SliderDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.prop( 'cssMap' );
        this.label   = wrapper.prop( 'label' );

        this.default        = wrapper.find( `.${this.cssMap.default}` );
        this.inputContainer = wrapper.find( `.${this.cssMap.inputContainer}` );
        this.track          = wrapper.find( `.${this.cssMap.track}` );
    }

    blur( index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERR
                .SLIDER_ERR( this.label, 'onBlur', 'disabled' ) );
        }

        this.inputContainer.childAt( index ).simulate( 'blur' );
        return this;
    }

    change( val, index = 0 )
    {
        const input = this.inputContainer.childAt( index );
        const node  = input.getNode();

        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERR
                .SLIDER_ERR( this.label, 'onChange', 'disabled' ) );
        }

        if ( this.wrapper.prop( 'isReadOnly' ) )
        {
            throw new Error( ERR
                .SLIDER_ERR( this.label, 'onChange', 'read only' ) );
        }

        node.value = val;
        input.simulate( 'change' );

        return this;
    }

    click()
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERR
                .SLIDER_ERR( this.label, 'onClick', 'disabled' ) );
        }

        this.track.simulate( 'click' );
        return this;
    }

    focus( index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERR
                .SLIDER_ERR( this.label, 'onFocus', 'disabled' ) );
        }

        this.inputContainer.childAt( index ).simulate( 'focus' );
        return this;
    }

    keyDown( keyCode, index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERR
                .SLIDER_ERR( this.label, 'onKeyDown', 'disabled' ) );
        }

        this.inputContainer.childAt( index ).simulate( 'keyDown', { keyCode } );
        return this;
    }

    keyUp( keyCode, index = 0 )
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERR
                .SLIDER_ERR( this.label, 'onKeyUp', 'disabled' ) );
        }

        this.inputContainer.childAt( index ).simulate( 'keyUp', { keyCode } );
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

    mouseDown()
    {
        this.track.first().simulate( 'mouseDown' );
        return this;
    }

    mouseUp() // not a React SyntheticEvent
    {
        this.wrapper.instance().handleUp();
        return this;
    }
}
