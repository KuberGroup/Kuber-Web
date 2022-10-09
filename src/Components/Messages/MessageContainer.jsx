import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";
import { db } from "../../firebase";
import { Button } from "../Button/Button";
import { MessageInput } from "../";
import { LeftMessage, RightMessage } from "./Messages";
import { BiSend, BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./MessageContainer.scss";

export const MessageContainer = ({ chatId }) => {
  const { chats } = useChat();
  const chat = chats.find((chat) => chat.id === chatId);
  const messageRef = useRef();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get messages from chat
  useEffect(() => {
    const chatListQuery = query(
      collection(db, "message", chat.id, "messages"),
      orderBy("timestamp", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(chatListQuery, (querySnapShot) => {
      const queryPromises = querySnapShot.docs.map((item) => {
        return new Promise((resolve, reject) => {
          resolve({
            ...item.data(),
            chatId: item.id,
          });
        });
      });

      Promise.all(queryPromises)
        .then((chatsData) => {
          setMessages(chatsData);
        })
        .finally(() => {
          setLoading(false);
        });
    });

    return () => unsubscribe();
  }, [chat.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      messageRef.current.value === "" || // do not send empty message
      messageRef.current.value.trim().length === 0 //do not send messages with only whitespaces
    )
      return (messageRef.current.value = "");

    try {
      await sendMessage(messageRef.current.value);
    } catch (e) {
      console.log(e);
    }
    messageRef.current.value = "";
  };

  const sendMessage = (payload) => {
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
      <div className="fl ChatHeader fl-c fl-j-fs">
        <Button
          className="BackBtn p-rel fl fl-c c-p"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack />
        </Button>
        <div className="UserName fl fl-c">{chat.displayName}</div>
      </div>
      <div
        className="fl fl-d-col-rev h-100 pt-2"
        style={{ overflow: "scroll" }}
      >
        {loading
          ? "Loading..."
          : messages.map((message) => {
              return message.uid === currentUser.uid ? (
                <RightMessage key={message.chatId} message={message} />
              ) : (
                <LeftMessage key={message.chatId} message={message} />
              );
            })}
      </div>
      <form className="w-100 fl" onSubmit={handleSubmit}>
        <div className="w-100" style={{ paddingRight: "5px" }}>
          <MessageInput
            label="Write Message Here."
            className="w-100"
            ref={messageRef}
          />
        </div>
        <Button
          className="p-rel fl fl-c c-p"
          style={{
            background: "rgb(156, 39, 176)",
            color: "#fff",
            borderRadius: "50%",
            padding: "0.5rem",
            width: "45px",
            height: "45px",
          }}
        >
          <BiSend size={24} />
        </Button>
      </form>
    </div>
  );
};