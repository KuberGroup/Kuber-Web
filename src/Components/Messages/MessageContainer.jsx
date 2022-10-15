import {
  addDoc,
  collection,
  doc,
  // limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useChat } from "../../Context/ChatContext";
import { db } from "../../firebase";
import { Button } from "../Button/Button";
import { MessageInput } from "../";
import { LeftMessage, RightMessage } from "./Messages";
import { BiSend, BiArrowBack, BiChevronsDown } from "react-icons/bi";
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
  const freindId = chat.members.filter((member) => member !== currentUser.uid);
  const [atBottom, setAtBottom] = useState(true);
  const messageEndRef = createRef();

  // get messages from chat
  useEffect(() => {
    const chatListQuery = query(
      collection(db, "message", chat.id, "messages"),
      orderBy("timestamp", "desc")
      // limit(20)
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

  const updateChatroom = async (payload) => {
    return updateDoc(doc(db, "chatRoom", chat.id), {
      recentMessage: {
        messageText: payload,
        sendAt: serverTimestamp(),
      },
    })
      .then(function (docRef) {})
      .catch(function (error) {
        // eslint-disable-next-line no-console
        console.error("Error writing document: ", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      messageRef.current.value === "" || // do not send empty message
      messageRef.current.value.trim().length === 0 //do not send messages with only whitespaces
    )
      return (messageRef.current.value = "");

    try {
      const payload = messageRef.current.value;
      sendMessage(payload).then((msgRef) => {
        updateChatroom(payload);
      });
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
      receiver: freindId,
      chatRoom: chat.id,
      seenby: [currentUser.uid],
      timestamp: serverTimestamp(),
    });
  };

  const scrollIndicator = useMemo(() => {
    if (!atBottom) {
      return (
        <div className="scroll-indicator">
          <div
            className="scroll-indicator__icon"
            onClick={() =>
              messageEndRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <BiChevronsDown />
          </div>
        </div>
      );
    }
  }, [atBottom, messageEndRef]);

  useEffect(() => {
    if (atBottom) messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messageEndRef, atBottom]);

  const HandleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight + 50 >= scrollHeight) setAtBottom(true);
    else setAtBottom(false);
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
        className="fl fl-d-col h-100 pt-2"
        style={{ overflow: "scroll" }}
        onScroll={HandleScroll}
      >
        {loading
          ? "Loading..."
          : [...messages].reverse().map((message) => {
              return message.uid === currentUser.uid ? (
                <RightMessage
                  key={message.chatId}
                  message={{ ...message, freindId: freindId }}
                />
              ) : (
                <LeftMessage key={message.chatId} message={message} />
              );
            })}
        <div ref={messageEndRef} />
      </div>
      {scrollIndicator}
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
