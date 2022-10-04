import React from "react";
import { CenterContainer, MainContainer } from "../../Components";
import { useAuth } from "../../Context/AuthContext";

const NotFound = () => {
  const { currentUser } = useAuth();
  return (
    <MainContainer logout={currentUser && true}>
      <CenterContainer>
        <div className="text-center">
          <h1 style={{ fontSize: "80px" }}>Error 404</h1>
          <h3 className="mt-3" style={{ fontSize: "30px", color: "#bfbfbf" }}>
            Page Not Found!
          </h3>
        </div>
      </CenterContainer>
    </MainContainer>
  );
};

export default NotFound;
