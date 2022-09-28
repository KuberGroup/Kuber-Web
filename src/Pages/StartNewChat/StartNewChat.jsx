import React from "react";
import { MainContainer } from "../../Components";

const StartNewChat = () => {
  return (
    <MainContainer>
      <div className="p-rel w-100 h-100vh" style={{ maxWidth: 480 }}>
        <div
          className=" p-rel fl fl-c fl-d-col w-100 h-100 m-0"
          style={{
            maxWidth: 480,
            marginTop: "45px",
          }}
        >
          StartNewChat
        </div>
      </div>
    </MainContainer>
  );
};

export default StartNewChat;
