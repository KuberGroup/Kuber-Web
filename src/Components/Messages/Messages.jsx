import React from "react";
import "./Messages.scss";
import { BiCheck, BiCheckDouble, BiTime } from "react-icons/bi";

export const LeftMessage = ({ message, group }) => {
  if (group)
    return (
      <div className="message l w-100 fl">
        <div className="fl fl-d-col">
          <div className="box left">
            <div className="display-initial">
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
          <div className="group-name">Sender's Name</div>
        </div>
      </div>
    );
  return (
    <div className="message l w-100 fl">
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
    <div className="message r w-100 fl fl-j-fe">
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
