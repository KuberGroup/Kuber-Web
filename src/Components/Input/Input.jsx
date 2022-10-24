import React, { useState, forwardRef } from "react";
import "./Input.scss";
import { BiSearch } from "react-icons/bi";

export const FormInput = forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState(false);
  function handleTextChange(text) {
    if (text.target.value !== "") return setIsActive(true);
    return setIsActive(false);
  }

  return (
    <div id="float-label">
      <input
        type={props.type ? props.type : "text"}
        value={props.value}
        onChange={handleTextChange}
        required={props.required ? props.required : false}
        ref={ref}
      />
      <label className={isActive ? "Active" : ""} htmlFor="email">
        {props.label ? props.label : "Label"}
      </label>
    </div>
  );
});

export const MessageInput = forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div id="message-input">
      <textarea
        type="text"
        value={props.value}
        required={false}
        ref={ref}
        placeholder={props.label ? props.label : "Label"}
        {...rest}
      />
    </div>
  );
});

export const SearchInput = forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div id="search-input" className="w-100">
      <div className="search-container fl fl-c ">
        <BiSearch size={18} className="icon" />
        <input
          type="search"
          value={props.value}
          required={false}
          ref={ref}
          placeholder="Search"
          className={`w-100 ${className}`}
          {...rest}
        />
      </div>
    </div>
  );
});
