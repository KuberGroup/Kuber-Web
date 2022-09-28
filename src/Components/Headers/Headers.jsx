import React, { useState } from "react";
import { BiLock } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CenterContainer } from "..";
import { useAuth } from "../../Context/AuthContext";
import { FiLogOut } from "react-icons/fi";
export const AuthHeader = ({ children }) => {
  return (
    <CenterContainer
      style={{
        marginBottom: "1rem",
      }}
    >
      <span
        className="p-rel fl fl-c m-1"
        style={{
          width: "40px",
          height: "40px",
          fontSize: "1.5rem",
          borderRadius: "50%",
          userSelect: "none",
          backgroundColor: "#9c27b0",
        }}
      >
        <BiLock color="#fff" />
      </span>

      <h1
        className="text-center"
        style={{
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          fontWeight: 400,
          fontSize: "1.5rem",
          lineHeight: 1.334,
          letterSpacing: "0em",
          color: "#101010",
        }}
      >
        {children}
      </h1>
    </CenterContainer>
  );
};

export const Header = ({ showLogout }) => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("login");
    } catch (e) {
      setError(`Failed to Log In ${e.code}`);
      console.log(error);
    }
  };

  return (
    <div
      className="p-abs t-0 l-0 w-100 fl fl-c fl-j-sb pl-1 pr-1"
      style={{
        height: "45px",
        backgroundColor: "#fff",
        zIndex: 0,
      }}
    >
      <span className="pl-1">Kuber Group</span>
      {showLogout && (
        <span
          className=" fl fl-c pr-1 c-p"
          style={{ color: "#ff0000" }}
          onClick={handleLogout}
        >
          <FiLogOut style={{ marginRight: 5 }} />
          Log Out
        </span>
      )}
    </div>
  );
};
