/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { ComponentDriver } from 'componentDriver';
import {
    Button,
    Checkbox,
    DatePicker,
    IconButton,
    InputField,
    ListBox,
    PasswordInput,
    ScrollBar,
    ScrollBox,
    TabButton,
    Tabs,
    Text,
    TextInputWithIcon,
    Tooltip,
} from 'nessie-ui';

import ButtonDriver            from './Button/driver';
import CheckboxDriver          from './Checkbox/driver';
import DatePickerDriver        from './DatePicker/driver';
import IconButtonDriver        from './IconButton/driver';
import InputFieldDriver        from './InputField/driver';
import ListBoxDriver           from './ListBox/driver';
import PasswordInputDriver     from './PasswordInput/driver';
import ScrollBarDriver         from './ScrollBar/driver';
import ScrollBoxDriver         from './ScrollBox/driver';
import TabButtonDriver         from './TabButton/driver';
import TabsDriver              from './Tabs/driver';
import TextDriver              from './Text/driver';
import TextInputWithIconDriver from './TextInputWithIcon/driver';
import TooltipDriver           from './Tooltip/driver';


const drivers =
[
    {
        Component : Button,
        Driver    : ButtonDriver,
    },
    {
        Component : Checkbox,
        Driver    : CheckboxDriver,
    },
    {
        Component : DatePicker,
        Driver    : DatePickerDriver,
    },
    {
        Component : IconButton,
        Driver    : IconButtonDriver,
    },
    {
        Component : InputField,
        Driver    : InputFieldDriver,
    },
    {
        Component : ListBox,
        Driver    : ListBoxDriver,
    },
    {
        Component : PasswordInput,
        Driver    : PasswordInputDriver,
    },
    {
        Component : ScrollBar,
        Driver    : ScrollBarDriver,
    },
    {
        Component : ScrollBox,
        Driver    : ScrollBoxDriver,
    },
    {
        Component : TabButton,
        Driver    : TabButtonDriver,
    },
    {
        Component : Tabs,
        Driver    : TabsDriver,
    },
    {
        Component : Text,
        Driver    : TextDriver,
    },
    {
        Component : TextInputWithIcon,
        Driver    : TextInputWithIconDriver,
    },
    {
        Component : Tooltip,
        Driver    : TooltipDriver,
    },
];

export default ComponentDriver.createDriverSuite( drivers );
