import React, { useRef, useState } from "react";
import {
  AlertMsg,
  FormButton,
  FormInput,
  MainContainer,
  UserCard,
} from "../../Components";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useChat } from "../../Context/ChatContext";
import { BiCopy } from "react-icons/bi";

const StartNewChat = () => {
  const searchRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { chats } = useChat();
  const copyUrlRef = useRef();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await SearchUserInFirebase(searchRef.current.value);
    } catch (e) {
      setError({
        variant: "error",
        message: e.code,
      });
    }
    setLoading(false);
  };

  const SearchUserInFirebase = async ({ email = null, uid = null }) => {
    const q = email
      ? query(collection(db, "users"), where("email", "==", email))
      : query(collection(db, "users"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty)
      return setError({
        variant: "error",
        message: "No user found with this email",
      });

    setUser(querySnapshot.docs[0].data());
    setError({
      variant: "success",
      message: "User found",
    });
  };

  const createNewChatroom = async () => {
    // Create New Chatrooom
    try {
      setError("");
      setLoading(true);

      const chatRoomExists = chats.filter((chat) =>
        chat.members.includes(user.uid)
      );

      if (chatRoomExists.length > 0)
        return navigate(`/chat/${chatRoomExists[0].id}`);

      await addDoc(collection(db, "chatRoom"), {
        group: false,
        members: [currentUser.uid, user.uid],
        recentMessage: {
          messageText: "Select User to Start Chat with.",
          sendAt: null,
        },
        unseenMessageCount: {
          [currentUser.uid]: 0,
          [user.uid]: 0,
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
      setError({
        variant: "error",
        message: e.code,
      });
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `https://kuberGroup.netlify.app/start-new-chat/${currentUser.email}`
    );
    copyUrlRef.current.classList.remove("error");
    copyUrlRef.current.classList.add("success");
    copyUrlRef.current.lastElementChild.innerText = "Copied Successfully!";
    setTimeout(() => {
      copyUrlRef.current.classList.remove("success");
      copyUrlRef.current.classList.add("error");
      copyUrlRef.current.lastElementChild.innerText = "Copy joining URL";
    }, 3000);
  };

  //when params id is present, automatically search for that user
  if (id && !user) {
    // searchRef.current.value = id;
    SearchUserInFirebase({ uid: id });
  }

  return (
    <MainContainer back>
      <div
        className="p-rel fl fl-c fl-d-col w-100 h-100"
        style={{ maxWidth: 480 }}
      >
        <div
          className=" p-rel fl fl-c fl-d-col w-100 h-100 m-0"
          style={{
            maxWidth: 480,
            background: "#fff",
          }}
        >
          <div className="text-center pb-1">
            <h1 style={{ color: "#111", fontWeight: "600" }}>Start New Chat</h1>
            <p className="pt-1">
              Search your freind or contact to start chat with.
            </p>
          </div>

          {error && (
            <AlertMsg className="mb-1" variant={error.variant}>
              {error.message}
            </AlertMsg>
          )}

          {!user ? (
            <form onSubmit={handleSubmit} className="w-100 pl-1 pr-1">
              <div className="mb-1" id="searchUser">
                <FormInput
                  label="Enter email address"
                  type="text"
                  ref={searchRef}
                  required
                />
              </div>
              <FormButton disabled={loading} className="w-100" type="submit">
                {loading ? "Searching User..." : "Search User"}
              </FormButton>
            </form>
          ) : (
            <div className="w-100 pt-1 fl fl-c fl-d-col w-100">
              <UserCard user={user} newChat={true} style={{ flexGrow: "0" }} />
              <FormButton
                className="mt-1"
                onClick={() =>
                  user.uid === currentUser.uid
                    ? setError({
                        variant: "error",
                        message: "You cant start chat with yourself",
                      })
                    : createNewChatroom()
                }
                style={{ width: "fit-content" }}
              >
                Start Chat
              </FormButton>
              <div className="w-100 fl fl-c">
                <div onClick={() => setUser(null)} className="p-1 m-1 c-p">
                  Wrong User, Search Again?
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="p-abs b-0 Alert fl fl-c mb-4 c-p error"
          onClick={() => copyToClipboard()}
          ref={copyUrlRef}
        >
          <BiCopy style={{ marginRight: 10 }} size={18} />
          <div>Copy Joining URL</div>
        </div>
      </div>
    </MainContainer>
  );
};

export default StartNewChat;
