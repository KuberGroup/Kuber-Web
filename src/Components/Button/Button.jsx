import React from "react";
import Ripple from "../Ripple/Ripple";
import "./Button.scss";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Button = (props) => {
  const { children, ...rest } = props;
  return (
    <button {...rest}>
      {children}
      <Ripple />
    </button>
  );
};

export const FormButton = (props) => {
  const { children, className, variant = "filled", ...rest } = props;
  return (
    <Button {...rest} className={`Button FormButton ${className} ${variant}`}>
      {children}
    </Button>
  );
};

export const StartNewChatButton = (props) => {
  return (
    <Button
      className="p-abs b-0 r-0 fl fl-c m-1 c-p StartNewChatButton"
      {...props}
    >
      <BiMessageSquareAdd color="#fff" size={24} className="icon" />
    </Button>
  );
};

export const BackButton = (props) => {
  const { className, ...rest } = props;
  const navigate = useNavigate();
  return (
    // <Button className="p-abs b-0 l-0 fl fl-c m-1 c-p BackButton" {...props}>
    //   <BiMessageSquareAdd color="#fff" size={24} className="icon" />
    // </Button>
    <Button
      className={`BackBtn p-rel fl fl-c c-p ${className}`}
      onClick={() => navigate(-1)}
      type="button"
      {...rest}
    >
      <IoArrowBackSharp />
    </Button>
  );
};
