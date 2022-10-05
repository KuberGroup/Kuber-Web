import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";
import { db } from "../../firebase";
import { Button } from "../Button/Button";
import { FormInput } from "../Input/Input";
import { LeftMessage, RightMessage } from "./Messages";

export const MessageContainer = ({ chatId }) => {
  const { chats } = useChat();
  const chat = chats.find((chat) => chat.id === chatId);
  const messageRef = useRef();
  const { currentUser } = useAuth();
  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messageRef.current.value === "") return;
    try {
      await sendMessage(messageRef.current.value);
    } catch (e) {
      console.log(e);
    }
    messageRef.current.value = "";
  };

  const sendMessage = (payload) => {
    console.log(payload);
    return addDoc(collection(db, "message", chat.id, "messages"), {
      uid: currentUser.uid,
      displayName: currentUser.displayName || "Kuber User",
      text: payload,
      profilePicUrl: currentUser.photoURL,
      receiver: chat.id,
      chatRoom: chat.id,
      seenby: [currentUser.uid],
      timestamp: serverTimestamp(),
    });
  };

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
      <form className="w-100 fl" onSubmit={handleSubmit}>
        <div className="w-100">
          <FormInput
            label="Write Message Here."
            className="w-100"
            ref={messageRef}
          />
        </div>
        <Button
          className="p-rel"
          style={{
            width: 45,
            height: 45,
            background: "rgb(156, 39, 176)",
            color: "#fff",
          }}
        >
          Send
        </Button>
      </form>
    </div>
  );
};
