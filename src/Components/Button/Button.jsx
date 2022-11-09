import React from "react";
import Ripple from "../Ripple/Ripple";
import "./Button.scss";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoArrowBackSharp, IoPeople, IoPersonAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
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

// mui style speed dial
export const SpeedDial = (props) => {
  const navigate = useNavigate();
  return (
    <div className="speed-dial p-abs fl fl-c fl-d-col-rev">
      <Button className="dialer p-rel fl fl-c c-p">
        <AiOutlinePlus />
      </Button>
      <div className="dials fl fl-d-col-rev">
        <div className="dial p-rel">
          <Button
            className="p-rel fl fl-c c-p"
            onClick={() => navigate("/start-new-chat")}
          >
            <IoPersonAdd />
          </Button>
          <span className="tooltip">Start New Chat</span>
        </div>
        <div className="dial p-rel">
          <Button
            className="p-rel fl fl-c c-p"
            onClick={() => navigate("/create-group")}
          >
            <IoPeople />
          </Button>
          <span className="tooltip">Create Group</span>
        </div>
      </div>
    </div>
  );
};
