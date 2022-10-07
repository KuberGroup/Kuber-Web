import React, { useState } from "react";
import { forwardRef } from "react";
import "./Input.scss";

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
      <input
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
