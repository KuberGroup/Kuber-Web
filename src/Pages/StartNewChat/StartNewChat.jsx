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
import { useNavigate } from "react-router-dom";

const StartNewChat = () => {
  const searchRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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

  const SearchUserInFirebase = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty)
      return setError({
        variant: "error",
        message: "No user found with this email",
      });

    querySnapshot.forEach((doc) => {
      setUser(doc.data());
      setError({
        variant: "success",
        message: "User found",
      });
    });
  };

  const createNewChatroom = async () => {
    // Create New Chatrooom
    try {
      setError("");
      setLoading(true);
      // const docRef = await addDoc(collection(db, "chatRoom"), {
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
      });
      // console.log("Document written with ID: ", docRef.id);
      setError({
        variant: "success",
        message: "Chatroom created",
      });
      navigate("/");
    } catch (e) {
      setError({
        variant: "error",
        message: e.code,
      });
    }
    setLoading(false);
  };

  return (
    <MainContainer>
      <div className="p-rel fl fl-c w-100 h-100" style={{ maxWidth: 480 }}>
        <div
          className=" p-rel fl fl-c fl-d-col w-100 h-100 m-0"
          style={{
            maxWidth: 480,
            background: "#fff",
          }}
        >
          <div className="text-center pb-1">
            <h1 style={{ color: "#111", fontWeight: "600" }}>Search Kuber</h1>
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
            <div className="w-100 pt-1">
              <UserCard
                user={user}
                newChat={true}
                onClick={() =>
                  user.uid === currentUser.uid
                    ? setError({
                        variant: "error",
                        message: "You cant start chat with yourself",
                      })
                    : createNewChatroom()
                }
              />
              <div className="w-100 fl fl-c">
                <div onClick={() => setUser(null)} className="p-1 m-1 c-p">
                  Wrong User, Search Again?
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
};

export default StartNewChat;
