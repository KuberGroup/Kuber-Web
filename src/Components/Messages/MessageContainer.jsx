import React from "react";
import { useChat } from "../../Context/ChatContext";
import { FormInput } from "../Input/Input";
import { LeftMessage, RightMessage } from "./Messages";

export const MessageContainer = ({ chatId }) => {
  const { chats } = useChat();
  const chat = chats.find((chat) => chat.id === chatId);

  return (
    <div
      className="ChatContainer p-rel fl fl-d-col w-100 h-100 m-0"
      style={{ background: "#fff" }}
    >
      <div className="fl" style={{ height: 45 }}>
        {chat.displayName}
      </div>
      <div className="fl fl-d-col h-100" style={{ overflow: "scroll" }}>
        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />

        <LeftMessage />
        <RightMessage />
      </div>
      <div className="w-100">
        <FormInput label="Write Message Here." className="w-100" />
      </div>
    </div>
  );
};
