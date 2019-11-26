/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children, cloneElement } from "react";

import ListBoxOption from "./ListBoxOption";
import ListBoxOptionGroup from "./ListBoxOptionGroup";

/**
 * ## isSelectedOption
 * Tests whether option element is a selected option
 *
 * @param   {ReactElement}  option      option element to check
 * @param   {Array|String}  selection   selected id or array of selected id’s
 *
 * @return  {Boolean}
 *
 */
function isSelectedOption(option, selection) {
  if (!(option || selection)) {
    return false;
  }
  if (Array.isArray(selection)) {
    return selection.indexOf(option.props.id) > -1;
  }
  return option.props.id === selection;
}

/**
 * ## buildOptions
 * Builds ListBoxOptions (and ListBoxOptionGroups) from array of objects
 *
 * @param   {Array}  options option objects
 *
 * @return  {Array}
 *
 */
function buildOptions(options = []) {
  return options.map((option = {}) => {
    if (typeof option === "object") {
      if (option.header) {
        const { options: groupOptions, ...groupProps } = option;

        return (
          <ListBoxOptionGroup {...groupProps} key={option.header}>
            {buildOptions(groupOptions)}
          </ListBoxOptionGroup>
        );
      }

      return <ListBoxOption {...option} key={option.id} />;
    }

    return <ListBoxOption id={option} key={option} text={option} />;
  });
}

/**
 * ## updateOptions
 * Updates the props of the ListBoxOptions based on props
 *
 * @param   {Array}     options option elements to update
 * @param   {Object}    props   props required for update
 *
 * @return  {Array}
 *
 */
const updateOptions = (options = [], props) => {
  if (!props) {
    return options;
  }

  return Children.toArray(options).map((option = {}, index) => {
    if (option.props.header) {
      return cloneElement(option, {
        children: updateOptions(option.props.children, props)
      });
    }

    return cloneElement(option, {
      ...(props.activeOption && {
        isActive: option.props.id === props.activeOption
      }),
      ...(props.onClickOption && { onClick: props.onClickOption }),
      ...(props.onMouseOutOption && { onMouseOut: props.onMouseOutOption }),
      ...(props.onMouseOverOption && { onMouseOver: props.onMouseOverOption }),
      ...(props.value && {
        isSelected: props.value && isSelectedOption(option, props.value)
      })
    });
  });
};

export { buildOptions, isSelectedOption, updateOptions };
