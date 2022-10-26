import React from "react";
import "./Messages.scss";
import { BiCheck, BiCheckDouble, BiTime } from "react-icons/bi";

export const LeftMessage = ({ message }) => {
  return (
    <div className="message w-100 fl">
      <div className="box left">
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

export const RightMessage = ({ message }) => {
  return (
    <div className="message w-100 fl fl-j-fe">
      <div className="box right">
        <div className="">
          <span>{message.text}</span>
          <span className="spacer"></span>
        </div>
        <div className="lhinit timestamp">
          {message.timestamp ? (
            <>
              <span>
                {message.timestamp.toDate().toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
              <div className="icon">
                <span>
                  {message.seenby.includes(message.freindId.toString()) ? (
                    <BiCheckDouble size={15} />
                  ) : (
                    <BiCheck size={15} />
                  )}
                </span>
              </div>
            </>
          ) : (
            <BiTime size={15} />
          )}
        </div>
      </div>
    </div>
  );
};
