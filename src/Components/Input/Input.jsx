import React, { useState, forwardRef } from "react";
import "./Input.scss";
import { BiSearch } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import { Button } from "../";

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
  const { className, image, ...rest } = props;

  return (
    <>
      <ImageInput onChange={image} />
      <textarea
        type="text"
        value={props.value}
        required={false}
        ref={ref}
        placeholder={props.label ? props.label : "Label"}
        {...rest}
      />
    </>
  );
});

export const ImageInput = forwardRef((props, ref) => {
  return (
    <div id="image-picker" className="fl fl-c h-100">
      <input
        type="file"
        alt="Select Image"
        accept="image/*"
        ref={ref}
        style={{ display: "none" }}
        id="file"
        onChange={props.onChange}
      />
      <Button
        onClick={() => document.getElementById("file").click()}
        className="p-rel image-picker-btn"
      >
        <IoImageOutline size={26} className="icon fl fl-h" />
      </Button>
    </div>
  );
});

export const SearchInput = forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div id="search-input" className="w-100">
      <div className="search-container fl p-rel">
        <BiSearch size={18} className="icon fl fl-c" />
        <input
          type="search"
          value={props.value}
          required={false}
          ref={ref}
          placeholder="Search"
          className={`w-100 p-abs ${className}`}
          {...rest}
        />
      </div>
    </div>
  );
});

export const Checkbox = forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div id="checkbox">
      <label className="container">{props.label ? props.label : "Label"}</label>
      <input
        type="checkbox"
        value={props.value}
        required={false}
        ref={ref}
        className={`w-100 p-abs ${className}`}
        {...rest}
      />
    </div>
  );
});
