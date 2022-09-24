import Copyright from "../Copyright/Copyright";
import React from "react";
import CenterContainer from "./CenterContainer";

const LoginContainer = ({ children }) => {
  return (
    <div style={{
      minHeight: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'
    }}>
      <div></div>
      <div className="w-100" style={{ maxWidth: "420px", padding: '1rem' }}>
        {children}
      </div>

      <Copyright />
    </div>
  );
};

export default LoginContainer;
