import React, { useState } from "react";
import { forwardRef } from "react";
import "./Input.css";

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
