import React from "react";
import Ripple from "../Ripple/Ripple";
import "./Button.scss";
import { BiMessageSquareAdd } from "react-icons/bi";

export const Button = (props) => {
  const { children } = props;
  return (
    <button {...props}>
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
