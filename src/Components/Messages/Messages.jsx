import React from "react";
import "./Messages.scss";

export const LeftMessage = ({ message }) => {
  return (
    <div className="message w-100 fl">
      <div className="box left">
        <div className="">
          <span>{message.text}</span>
          <span className="spacer"></span>
        </div>
        <div className="lhinit timestamp">
          {message.timestamp.toDate().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
};

export const RightMessage = ({ message }) => {
  return (
    <div className="message w-100 fl fl-j-fe">
      <div className="box right">
        <div className="">
          <span>{message.text}</span>
          <span className="spacer"></span>
        </div>
        <div className="lhinit timestamp">
          {message.timestamp
            ? message.timestamp.toDate().toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
            : "sending..."}
        </div>
      </div>
    </div>
  );
};
