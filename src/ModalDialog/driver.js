/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton } from 'nessie-ui';

import SimpleComponentDriver
    from '../Testing/CommonDrivers/simpleComponentDriver';


const ERR = {
    NOT_A_CAROUSEL : item => `Cannot trigger click on the "${item}" because \
the modal is not a Carousel`
};

export default class ModalDialogDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.content}` );

        this.overlay = wrapper.find( `.${this.cssMap.default}` );

        this.closeButton = wrapper.find( `.${this.cssMap.header}` )
            .find( IconButton );

        this.prevButton = wrapper.find( `.${this.cssMap.navigation}` )
            .find( IconButton ).first();

        this.nextButton = wrapper.find( `.${this.cssMap.navigation}` )
            .find( IconButton ).last();
    }

    getContent()
    {
        return this.control.children();
    }

    clickOverlay()
    {
        this.overlay.simulate( 'click' );
    }

    clickClose()
    {
        if ( this.wrapper.prop( 'type' ) !== 'carousel' )
        {
            throw new Error( ERR.NOT_A_CAROUSEL( 'Close Button' ) );
        }
        this.closeButton.driver().click();
    }

    clickPrev()
    {
        if ( this.wrapper.prop( 'type' ) !== 'carousel' )
        {
            throw new Error( ERR.NOT_A_CAROUSEL( 'Prev Button' ) );
        }
        this.prevButton.driver().click();
    }

    clickNext()
    {
        if ( this.wrapper.prop( 'type' ) !== 'carousel' )
        {
            throw new Error( ERR.NOT_A_CAROUSEL( 'Next Button' ) );
        }
        this.nextButton.driver().click();
    }
}
