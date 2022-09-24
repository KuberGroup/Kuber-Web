import React from "react";
import "./AlertMsg.css";
import { TbAlertCircle } from "react-icons/tb";

const AlertMsg = ({ text }) => {
  return (
    <div className="Alert">
      <TbAlertCircle
        color="#ef5350"
        style={{
          marginRight: "2px",
          padding: "7px 0",
          display: "flex",
          fontSize: 32,
          opacity: "0.9",
        }}
      />
      <div>{text}</div>
    </div>
  );
};

export default AlertMsg;
