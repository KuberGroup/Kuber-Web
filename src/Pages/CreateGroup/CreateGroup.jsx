import React, { useRef, useState } from "react";
import {
  AlertMsg,
  Checkbox,
  FormButton,
  FormInput,
  MainContainer,
} from "../../Components";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../Context/ChatContext";

const CreateGroup = () => {
  const nameRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { chats } = useChat();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nameRef.current.value)
      return setError({
        variant: "error",
        message: "Please enter a group name",
      });
    setName(nameRef.current.value);
    setStep(false);
  };

  const createNewChatroom = async (e) => {
    e.preventDefault();

    // Create New Chatrooom
    try {
      setError("");
      setLoading(true);

      const freindIdsOfSelectedUsers = chats.reduce((acc, chat) => {
        if (selectedUsers.includes(chat.id)) {
          acc.push(
            chat.members.filter((member) => member !== currentUser.uid)[0]
          );
        }
        return acc;
      }, []);

      const unseenMessageCount = freindIdsOfSelectedUsers.reduce(
        (acc, user) => {
          acc[user] = 0;
          return acc;
        },
        {}
      );

      await addDoc(collection(db, "chatRoom"), {
        group: true,
        displayName: name,
        members: [currentUser.uid, ...freindIdsOfSelectedUsers],
        recentMessage: {
          messageText: `${
            currentUser.displayName || currentUser.email
          } created this group`,
          sendAt: serverTimestamp(),
        },
        unseenMessageCount: {
          [currentUser.uid]: 0,
          ...unseenMessageCount,
        },
        timestamp: serverTimestamp(),
      }).then((docRef) => {
        setError({
          variant: "success",
          message: "Chatroom created",
        });
        navigate(`/chat/${docRef.id}`);
      });
    } catch (e) {
      console.log(e);
      setError({
        variant: "error",
        message: e.code,
      });
    }
    setLoading(false);
  };

  const handleSelectUser = (e) => {
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, e.target.value]);
    } else {
      setSelectedUsers(selectedUsers.filter((user) => user !== e.target.value));
    }
  };

  return (
    <MainContainer back>
      <div className="p-rel fl fl-c w-100 h-100" style={{ maxWidth: 480 }}>
        <div
          className=" p-rel fl fl-c fl-d-col w-100 h-100 m-0"
          style={{
            maxWidth: 480,
            background: "#fff",
          }}
        >
          <div className="text-center pb-1">
            <h1 style={{ color: "#111", fontWeight: "600" }}>
              {step ? "Create Group" : "Select Members"}
            </h1>
            <p className="pt-1">
              {step
                ? "Enter a group name to create a group"
                : "Select freinds, family or contacts to add to the group"}
            </p>
          </div>

          {error && (
            <AlertMsg className="mb-1" variant={error.variant}>
              {error.message}
            </AlertMsg>
          )}

          {step ? (
            <form onSubmit={handleSubmit} className="w-100 pl-1 pr-1">
              <div className="mb-1" id="searchUser">
                <FormInput
                  label="Group Name"
                  type="text"
                  ref={nameRef}
                  required
                />
              </div>

              <div className="fl">
                <FormButton disabled={loading} className="w-100" type="submit">
                  {loading ? "Loading..." : "Create Group"}
                </FormButton>
              </div>
            </form>
          ) : (
            <div className="w-100 pt-1">
              <div className="user-list" style={{ maxHeight: "60vh" }}>
                <form onSubmit={createNewChatroom}>
                  {chats.map(
                    (user) =>
                      !user.group && (
                        <Checkbox
                          key={user.id}
                          label={user.displayName}
                          onChange={handleSelectUser}
                          value={user.id}
                        />
                      )
                  )}
                  <FormButton
                    disabled={loading}
                    className="w-100 mt-1"
                    type="submit"
                  >
                    {loading ? "Loading..." : "Create Group"}
                  </FormButton>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
};

export default CreateGroup;
