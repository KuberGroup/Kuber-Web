import React from "react";
import Ripple from "../Ripple/Ripple";
import { BiUser } from "react-icons/bi";
import "./Cards.scss";
import { useAuth } from "../../Context/AuthContext";

export const UserCard = (props) => {
  const {
    user = {
      displayName: "Loading...",
      email: "Loading...",
      photoURL: "Loading...",
      uid: null,
    },
    newChat = false,
    className = "",
    ...rest
  } = props;
  const { currentUser } = useAuth();

  return (
    <div className={`fl user ${className}`}>
      <div
        className="p-rel fl c-p w-100"
        style={{
          padding: ".5rem 1rem",
          overflow: "hidden",
        }}
        {...rest}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt=""
            className="user-pic c-p"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#eee",
              border: "none",
            }}
          />
        ) : (
          <div
            className="user-pic c-p fl fl-c"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#eee",
              border: "none",
            }}
          >
            <BiUser size={35} />
          </div>
        )}

        <div
          className="user-data fl pl-1 c-p"
          style={{ width: "calc(100% - 50px)" }}
        >
          <div className="name-data w-100 fl fl-d-col fl-j-se lhinit h-100 ellipsis">
            <div className="fl fl-j-sb">
              <div className="name-item ellipsis">{user.displayName}</div>
              <div
                className="timestamp fl fl-c pr-1"
                style={{ fontSize: 10, color: "#ccc" }}
              >
                {newChat
                  ? ""
                  : user.recentMessage.sendAt
                  ? user.recentMessage.sendAt.toDate().toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                  : "s"}
              </div>
            </div>
            <div className="fl fl-j-sb">
              <div
                className="message-item ellipsis"
                style={{ fontSize: 14, color: "#ccc" }}
              >
                {newChat
                  ? `Click to Start new chat with ${user.displayName}`
                  : user.recentMessage.messageText}
              </div>
              {user.unseenMessageCount?.[currentUser.uid] > 0 && (
                <div className="timestamp fl fl-c pr-1">
                  <span
                    style={{
                      fontSize: 10,
                      color: "#ccc",
                      background: "#6e00ff",
                      padding: ".2rem .3rem",
                      borderRadius: "25px",
                    }}
                  >
                    {user.unseenMessageCount?.[currentUser.uid]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Ripple />
      </div>
    </div>
  );
};
