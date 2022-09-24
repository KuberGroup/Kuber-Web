import React, { useState } from "react";
import "./Input.css";

const FormInput = (props) => {
  const [isActive, setIsActive] = useState(false);
  function handleTextChange(text) {
    if (text !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return (
    <div id="float-label">
      <input
        type={props.type ? props.type : "text"}
        value={props.value}
        onChange={(e) => {
          props.handleInputData(e.target.value);
          handleTextChange(e.target.value);
        }}
        required={props.required ? props.required : false}
      />
      <label className={isActive ? "Active" : ""} htmlFor="email">
        {props.label ? props.label : "Label"}
      </label>
    </div>
  );
};

export default FormInput;
