/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children, forwardRef, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { escapeRegExp, uniq } from "lodash";

import { ListBox, ScrollBox } from "..";

import Popup from "../Popup";
import PopperWrapper from "../PopperWrapper";
import { attachEvents, callMultiple, useId, useThemeClasses } from "../utils";
import { buildTagsFromValues } from "./utils";
import { addPrefix } from "../ComboBox/utils";

/**
 * gets the index of the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Number} index of the option
 */
function getIndex(id, options = []) {
  return options.findIndex(opt => opt.id === id);
}

/**
 * gets the option by the passed id
 *
 * @param {String} id id of the option
 * @param {Array} options Array of options
 *
 * @return {Object} option Object.
 */
function getOption(id, options = []) {
  return options.find(opt => opt.id === id);
}

/**
 * normalize array of options or value
 *
 * @param   {Array} options options to normalize
 *
 * @return  {Array} normalized options
 */
function normalizeOptions(options) {
  if (!Array.isArray(options)) return;

  return options.map(opt =>
    typeof opt === "object" ? opt : { id: opt, text: opt }
  );
}

const componentName = "TagInput";

const TagInput = forwardRef((props, ref) => {
  const cssMap = useThemeClasses(componentName, props);
  const id = useId(componentName, props);

  const {
    children,
    popperContainer,
    hasError,
    isDisabled,
    isReadOnly,
    placeholder,
    style
  } = props;

  const [activeOption, setActiveOption] = useState(undefined);
  const [filteredOptionsState, setFilteredOptionsState] = useState(undefined);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [valueState, setValueState] = useState(
    Array.isArray(props.defaultValue) ? props.defaultValue : []
  );

  const options = useMemo(() => normalizeOptions(props.suggestions) || [], [
    props.suggestions
  ]);

  const filteredOptions = useMemo(() => filteredOptionsState || options, [
    options,
    filteredOptionsState
  ]);

  const value = useMemo(() => {
    if (children) {
      return children.map(({ props }) => props.label);
    }
    if (Array.isArray(props.value)) {
      return props.value;
    }
    if (props.value === "" || props.value === null) {
      return [];
    }
    return valueState;
  }, [children, props.value, valueState]);

  const enterTags = () => {
    let finalTags = [];

    if (props.split) {
      finalTags = inputValue
        .split(props.split)
        .map(singleValue => enterNewTag(singleValue));

      finalTags = finalTags.filter(item => typeof item !== "undefined");
      finalTags = uniq([...value, ...finalTags]);
    } else {
      finalTags = enterNewTag(inputValue);
      finalTags = finalTags ? [...value, enterNewTag(inputValue)] : value;
    }

    const { onChange } = props;
    if (typeof onChange === "function") {
      onChange({ value: finalTags });
    }

    setActiveOption(undefined);
    setFilteredOptionsState(filterOptions(finalTags));
    setInputValue("");
    setValueState(finalTags);
  };

  const enterNewTag = singleValue => {
    let newTag;

    if (!value.find(tag => tag === singleValue)) {
      if (activeOption) {
        const option = getOption(activeOption, filteredOptions);

        newTag = value.indexOf(activeOption) !== -1 ? inputValue : option.text;
      } else if (singleValue) {
        newTag = singleValue;
      }
    }

    return newTag;
  };

  const filterOptions = tags =>
    options.filter(option => !tags.includes(option.text));

  const handleBlur = () => {
    setIsOpen(false);
    enterTags();
  };

  const handleChangeInput = e => {
    e.stopPropagation();
    const { value: scopedValue } = e.target;
    const filteredOptionsScoped = options.filter(({ text }) =>
      text.match(new RegExp(escapeRegExp(scopedValue), "i"))
    );

    const activeOptionScoped =
      scopedValue && filteredOptionsScoped.length
        ? filteredOptionsScoped[0].id
        : undefined;

    setActiveOption(activeOptionScoped);
    setFilteredOptionsState(filteredOptionsScoped);
    setInputValue(scopedValue);
  };

  const handleClickClose = ({ id: scopedId }) => {
    const newTags = value.filter(tag => tag !== scopedId);

    const { onChange } = props;
    if (typeof onChange === "function") {
      onChange({ value: newTags });
    }

    setValueState(newTags);
    setFilteredOptionsState(filterOptions(newTags));
  };

  const handleClickOption = ({ id: scopedId }) => {
    const option = getOption(scopedId, filteredOptions);
    const newTags = [...value, option.text];
    const { onChange } = props;
    if (typeof onChange === "function") {
      onChange({ value: newTags });
    }
    setActiveOption(undefined);
    setFilteredOptionsState(filterOptions(newTags));
    setInputValue("");
    setValueState(newTags);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = e => {
    const { key } = e;

    if (key === "Backspace") {
      let newTags = value;
      if (!inputValue) {
        newTags = value.slice(0, -1);

        const { onChange } = props;
        if (typeof onChange === "function") {
          onChange({ value: newTags });
        }
      }
      setValueState(newTags);
      setFilteredOptionsState(filterOptions(newTags));
    }
    if (key === "Enter") {
      enterTags();
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      e.preventDefault();

      if (isOpen && filteredOptions.length) {
        const minIndex = 0;
        const maxIndex = filteredOptions.length - 1;

        let activeIndex = getIndex(activeOption, filteredOptions);

        activeIndex =
          key === "ArrowUp"
            ? Math.max(activeIndex - 1, minIndex)
            : Math.min(activeIndex + 1, maxIndex);

        setActiveOption(filteredOptions[activeIndex].id);
      }

      setIsOpen(true);
    }
  };

  const handleMouseOutOption = () => {
    setActiveOption(undefined);
  };

  const handleMouseOverOption = ({ id: scopedId }) => {
    setActiveOption(scopedId);
  };

  const listBoxOptions = filteredOptions.reduce((result, opt) => {
    if (!value.find(tag => tag === opt.id)) {
      result.push(opt);
    }
    return result;
  }, []);

  const dropdownContent = listBoxOptions.length > 0 && (
    <ScrollBox height="50vh" scroll="vertical">
      <ListBox
        activeOption={activeOption}
        id={addPrefix("listbox", id)}
        isFocusable={false}
        onClickOption={handleClickOption}
        onMouseOutOption={handleMouseOutOption}
        onMouseOverOption={handleMouseOverOption}
        options={listBoxOptions}
      />
    </ScrollBox>
  );

  let items = children
    ? Children.toArray(children)
    : buildTagsFromValues(value);

  items = items.map(tag =>
    React.cloneElement(tag, {
      ...tag.props,
      isDisabled: isDisabled || tag.props.isDisabled,
      isReadOnly: isReadOnly || tag.props.isReadOnly,
      onClick: handleClickClose
    })
  );

  return (
    <PopperWrapper
      container={popperContainer}
      isVisible={listBoxOptions.length > 0 && isOpen}
      matchRefWidth
      popper={popperProps => (
        <Popup hasError={hasError} {...popperProps}>
          {dropdownContent}
        </Popup>
      )}
      popperOffset="s"
      popperPosition="bottom"
      ref={ref}
    >
      {refProps => (
        <label
          {...attachEvents(props)}
          className={cssMap.main}
          htmlFor={id}
          style={style}
          {...refProps}
        >
          {items}
          <input
            className={cssMap.input}
            disabled={isDisabled}
            id={id}
            onBlur={callMultiple(handleBlur, props.onBlur)} // temporary fix
            onChange={handleChangeInput}
            onFocus={callMultiple(handleFocus, props.onFocus)} // temporary fix
            onKeyDown={callMultiple(handleKeyDown, props.onKeyDown)} // temporary fix
            placeholder={placeholder}
            readOnly={isReadOnly}
            type="text"
            value={inputValue}
          />
        </label>
      )}
    </PopperWrapper>
  );
});

TagInput.propTypes = {
  /**
   * Node containing Tag components ( overrides value prop )
   */
  children: PropTypes.node,
  /**
   *  CSS class name
   */
  className: PropTypes.string,
  /**
   *  id of the DOM element used as container for popup listbox
   */
  popperContainer: PropTypes.string,
  /**
   *  CSS class map
   */
  cssMap: PropTypes.objectOf(PropTypes.string),
  /**
   *  Initial value (when component is uncontrolled)
   */
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  /**
   *  Display as error/invalid
   */
  hasError: PropTypes.bool,
  /**
   *  Component id
   */
  id: PropTypes.string,
  /**
   *  Display as disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  Display as read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   *  Change callback function
   */
  onChange: PropTypes.func,
  /**
   *  Placeholder text
   */
  placeholder: PropTypes.string,
  /**
   *  Tag suggestions
   */
  suggestions: PropTypes.arrayOf(PropTypes.string),
  /**
   *  String or Regex Pattern to split tags from an unique value
   */
  split: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)])
  ),
  /**
   * Array of strings to build Tag components
   */
  value: PropTypes.arrayOf(PropTypes.string),
  /**
   *  Style overrides
   */
  style: PropTypes.objectOf(PropTypes.string)
};

TagInput.defaultProps = {
  children: undefined,
  className: undefined,
  cssMap: undefined,
  defaultValue: undefined,
  hasError: false,
  id: undefined,
  isDisabled: false,
  isReadOnly: false,
  onChange: undefined,
  placeholder: undefined,
  popperContainer: undefined,
  style: undefined,
  suggestions: undefined,
  split: undefined,
  value: undefined
};

TagInput.displayName = componentName;

export default TagInput;
