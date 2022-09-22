import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import LoginContainer from "../Containers/LoginContainer";
import AlertMsg from "../Styles/Alert";

const VerifyEmail = () => {
  const { currentUser, sendVerificationEmail, logout } = useAuth();
  const [timer, setTimer] = useState(0);
  const [timerText, setTimerText] = useState(`in 00`);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        setTimerText(`in ${timer}`);
      } else {
        clearInterval(myInterval);
        setTimer();
        setTimerText();
        setDisabled(false);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleSubmit = async (e) => {
    setTimer(15);
    setEmailSent(true);
    setMessage("Verification email sent Successful");

    try {
      await sendVerificationEmail();
    } catch (e) {
      setError(`Failed to send verification email: ${e.code}`);
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch (e) {
      setError(`Failed to Log In ${e.code}`);
    }
  };

  if (currentUser.emailVerified) navigate("/");

  return (
    <LoginContainer>
      <div
        className="position-fixed top-0 end-0 px-4 py-2"
        style={{ cursor: "pointer" }}
      >
        <div
          className=" d-flex align-items-center justify-content-center lh-1"
          onClick={handleLogout}
        >
          <FiLogOut style={{ marginRight: 5 }} />
          log Out
        </div>
      </div>
      <Card>
        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
          <h2 className="text-center mb-4">Email Verification</h2>
          {error && <AlertMsg variant="danger" text={error} />}
          {message && <AlertMsg variant="success" text={error} />}
          <p className="text-center">
            An email with verification link has been sent to{" "}
            <strong>{currentUser.email}</strong>. If you haven't received it,
            Check SPAM Folder
          </p>
          {emailSent ? (
            <p className="text-center">Didn't receive email?</p>
          ) : (
            <p className="text-center">
              Click below to send verification email?
            </p>
          )}
          <div className="d-flex justify-content-around w-100">
            {emailSent ? (
              <>
                <Button
                  variant="outline-primary"
                  disabled={disabled}
                  onClick={() => {
                    setTimerText(`in 15`);
                    setDisabled(true);
                    handleSubmit();
                  }}
                  style={{ width: "100%", maxWidth: "150px" }}
                >
                  Re-send {timerText}
                </Button>
                <Button
                  variant="primary"
                  disabled={!currentUser.emailVerified}
                  onClick={() => navigate("/")}
                  style={{ width: "100%", maxWidth: "150px" }}
                >
                  Verify
                </Button>
              </>
            ) : (
              <Button
                variant="outline-primary"
                disabled={disabled}
                onClick={() => {
                  setTimerText(`in 15`);
                  setDisabled(true);
                  handleSubmit();
                }}
                style={{ width: "100%" }}
              >
                Send Verification Email
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </LoginContainer>
  );
};

export default VerifyEmail;
