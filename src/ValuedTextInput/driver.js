import { InputField } from '../index';

const ERR = {
    INPUT_DISABLED : ( doWhat ) => `Input can't ${doWhat} since it is disabled`,
    INPUT_READONLY : ( doWhat ) =>
        `Input can't ${doWhat} since it is read only`,
};

export default class ValuedTextInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'blur' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'blur' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'click' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'click' ) );
        }

        this.wrapper.find( InputField ).driver().click();
        return this;
    }

    change( val = 'abc' )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'change' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'change' ) );
        }

        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'focus' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'focus' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    keyPress()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'keyPress' ) );
        }

        this.wrapper.find( InputField ).driver().keyPress();
        return this;
    }

    mouseOver()
    {
        this.wrapper.find( 'InputContainer' ).simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.find( 'InputContainer' ).simulate( 'mouseleave' );
        return this;
    }
}
