import React from "react";
import "./Chip.scss";

const Chip = ({ variant = "filled", label = "Chip" }) => {
  return (
    <div className={`chip fl fl-c ${variant}`}>
      <span className="ellipsis">{label}</span>
    </div>
  );
};

export default Chip;
