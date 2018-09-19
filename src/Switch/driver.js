/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import SimpleComponentDriver from
    '../Testing/CommonDrivers/simpleComponentDriver';

const ERRORS = {
    SWITCH_CANNOT_BE_TOGGLED : ( state ) =>
        `Switch cannot be toggled since it is ${state}`
};

export default class SwitchDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
        this.input = wrapper.find( `.${wrapper.props().cssMap.input}` );
    }

    toggle()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' )
            );
        }
        if ( props.isReadOnly )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'readonly' )
            );
        }

        const node = this.input.getNode();

        node.checked = !node.checked;
        this.input.simulate( 'change' );

        return this.wrapper;
    }

    blur()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' )
            );
        }

        this.input.simulate( 'blur' );
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error(
                ERRORS.SWITCH_CANNOT_BE_TOGGLED( 'disabled' )
            );
        }

        this.input.simulate( 'focus' );
        return this;
    }
}
