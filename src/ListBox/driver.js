const ERRORS = {
    OPTION_CANNOT_BE_CLICKED : () => 'Option cannot be clicked since it\'s disabled', // eslint-disable-line max-len
};

export default class ListBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickOption( index = 0 )
    {
        const option = this.wrapper.find( 'ListBoxOption' ).at( index );

        if ( option.props().isDisabled )
        {
            throw new Error( ERRORS.OPTION_CANNOT_BE_CLICKED() );
        }

        option.simulate( 'click' );
        return this;
    }

    mouseOverOption( index = 0 )
    {
        this.wrapper.find( 'ListBoxOption' ).at( index )
            .simulate( 'mouseenter' );
        return this;
    }

    mouseOutOption( index = 0 )
    {
        this.wrapper.find( 'ListBoxOption' ).at( index )
            .simulate( 'mouseleave' );
        return this;
    }
}
