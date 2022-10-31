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
      <div className="p-rel fl c-p w-100" {...rest}>
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="user-pic c-p" />
        ) : (
          <div className="user-pic c-p fl fl-c">
            <BiUser size={35} />
          </div>
        )}

        <div className="user-data fl fl-d-col pl-1 c-p">
          <div className="name-data fl lhinit ellipsis">
            <div className="fl fl-j-sb">
              <div className="name-item ellipsis">{user.displayName}</div>
              <div className="timestamp fl fl-c">
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
          </div>

          <div className="message-data fl fl-j-sb lhinit">
            <div className="message-item ellipsis">
              {newChat
                ? `Click to Start new chat with ${user.displayName}`
                : user.recentMessage.messageText}
            </div>
            {user.unseenMessageCount?.[currentUser.uid] > 0 && (
              <div className="notif-badge fl fl-c">
                <span>{user.unseenMessageCount?.[currentUser.uid]}</span>
              </div>
            )}
          </div>
        </div>
        <Ripple />
      </div>
    </div>
  );
};
