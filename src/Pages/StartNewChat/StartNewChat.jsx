import React, { useRef, useState } from "react";
import {
  AlertMsg,
  FormButton,
  FormInput,
  MainContainer,
} from "../../Components";

const StartNewChat = () => {
  const searchRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      // await signup(emailRef.current.value, passwordRef.current.value);
      console.log(searchRef.current.value);
    } catch (e) {
      setError(e.code);
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
            <p className="pt-1 pb-1">
              Search your freind or contact to start chat with.
            </p>
          </div>

          {error && <AlertMsg className="mt-1 mb-1" text={error} />}
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
              Search User
            </FormButton>
          </form>
        </div>
      </div>
    </MainContainer>
  );
};

export default StartNewChat;
