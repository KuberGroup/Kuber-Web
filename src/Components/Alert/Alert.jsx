import React from "react";
import "./Alert.css";
import { TbAlertCircle } from "react-icons/tb";

export const AlertMsg = ({ text, className, style }) => {
  return (
    <div className={`Alert ${className}`} style={style}>
      <TbAlertCircle
        color="#ef5350"
        className="fl"
        style={{
          marginRight: "2px",
          padding: "7px 0",
          fontSize: 32,
          opacity: "0.9",
        }}
      />
      <div>{text}</div>
    </div >
  );
};