import {
  addDoc,
  collection,
  doc,
  increment,
  // limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
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
  const isFirstRender = useRef(true);
  const lastUnreadMessage = useRef(null);

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
      [`unseenMessageCount.${freindId}`]: increment(1),
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
    messageRef.current.focus();
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
              messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <BiChevronsDown />
          </div>
        </div>
      );
    }
  }, [atBottom, messageEndRef]);

  useEffect(() => {
    if (atBottom) messageEndRef.current?.scrollIntoView();
  }, [messages, messageEndRef, atBottom]);

  const HandleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight + 50 >= scrollHeight) setAtBottom(true);
    else setAtBottom(false);
  };

  const useDetectKeyboardOpen = (minKeyboardHeight = 300, defaultValue) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(defaultValue);

    useEffect(() => {
      const listener = () => {
        const newState =
          window.screen.height - minKeyboardHeight >
          window.visualViewport.height;
        if (isKeyboardOpen !== newState) {
          setIsKeyboardOpen(newState);
        }
      };
      window.visualViewport.addEventListener("resize", listener);
      return () => {
        window.visualViewport.removeEventListener("resize", listener);
      };
    }, [isKeyboardOpen, minKeyboardHeight]);

    return isKeyboardOpen;
  };

  const isKeyboardOpen = useDetectKeyboardOpen();

  useEffect(() => {
    if (isKeyboardOpen && atBottom) messageEndRef.current?.scrollIntoView();
  }, [isKeyboardOpen, messageEndRef, atBottom]);

  // update read status
  useEffect(() => {
    if (messages.length > 0) {
      const unreadMessages = messages.filter(
        (message) => !message.seenby.includes(currentUser.uid)
      );
      const lastMessage = messages[0];
      if (lastMessage.uid !== currentUser.uid) {
        const updateReadStatus = async () => {
          const batch = writeBatch(db);

          unreadMessages.forEach(async (message) => {
            const messageRef = doc(
              db,
              "message",
              chat.id,
              "messages",
              message.chatId
            );
            batch.update(messageRef, {
              seenby: [...message.seenby, currentUser.uid],
            });
          });

          const chatRoomRef = doc(db, "chatRoom", chat.id);
          batch.update(chatRoomRef, {
            [`unseenMessageCount.${currentUser.uid}`]: 0,
          });

          return batch
            .commit()
            .then(function (docRef) {
              // console.log("Document written with ID: ", docRef);
            })
            .catch(function (error) {
              // eslint-disable-next-line no-console
              // console.error("Error writing document: ", error);
            });
        };

        //get details to show tag when chat is just started
        if (isFirstRender.current) {
          if (!lastMessage.seenby.includes(currentUser.uid)) {
            lastUnreadMessage.current =
              unreadMessages[unreadMessages.length - 1];

            isFirstRender.current = false;
          }
        } else {
          lastUnreadMessage.current = null;
        }

        //if last message is not read by current user
        if (document.visibilityState === "visible")
          !lastMessage.seenby.includes(currentUser.uid) && updateReadStatus();
        else
          document.onvisibilitychange = () => {
            if (document.visibilityState !== "visible") {
              isFirstRender.current = true;
            }
            if (document.visibilityState === "visible") {
              lastUnreadMessage.current =
                unreadMessages[unreadMessages.length - 1];
              isFirstRender.current = false;

              !lastMessage.seenby.includes(currentUser.uid) &&
                updateReadStatus();
            }
          };
      }
    }
  }, [messages, currentUser.uid, chat.id]);

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
      <div className="fl h-100" style={{ overflow: "hidden" }}>
        <div
          className="fl fl-d-col h-100 pt-2 w-100"
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
                  <>
                    {lastUnreadMessage.current?.chatId === message.chatId && (
                      <div className="fl fl-c w-100">
                        <span
                          style={{
                            background: "#999",
                            color: "#fff",
                            textAlign: "center",
                            padding: ".2rem 1rem",
                            fontSize: "12px",
                            fontWeight: "bold",
                            borderRadius: "20px",
                          }}
                        >
                          Unread Messages
                        </span>
                      </div>
                    )}

                    <LeftMessage key={message.chatId} message={message} />
                  </>
                );
              })}
          <div ref={messageEndRef} />
        </div>
      </div>
      {scrollIndicator}
      <form className="w-100 fl" onSubmit={handleSubmit}>
        <div className="w-100 input-container">
          <MessageInput
            label="Write Message Here..."
            className="w-100"
            ref={messageRef}
            onFocus={messageEndRef.current?.scrollIntoView()}
          />
        </div>
        <Button type="submit" className="p-rel fl fl-c c-p">
          <BiSend size={24} />
        </Button>
      </form>
    </div>
  );
};
