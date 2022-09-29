import React from "react";
import "./Alert.scss";
import { TbAlertCircle, TbCircleCheck } from "react-icons/tb";

export const AlertMsg = ({ className, style, variant = "error", children }) => {
  return (
    <div className={`Alert ${className} ${variant}`} style={style}>
      {variant === "success" ? (
        <TbCircleCheck color="#0f5132" className="fl icon" />
      ) : (
        <TbAlertCircle color="#ef5350" className="fl icon" />
      )}
      <div>{children}</div>
    </div>
  );
};
