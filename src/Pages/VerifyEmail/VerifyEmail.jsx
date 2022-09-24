import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { AlertMsg, FormButton, LoginContainer, AuthHeader } from "../../Components";

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
        className="p-fix t-0 r-0 pr-1 pt-1 c-p"
      >
        <div
          className="fl fl-c lhinit"
          onClick={handleLogout}
        >
          <FiLogOut style={{ marginRight: 5 }} />
          log Out
        </div>
      </div>
      <AuthHeader>Email Verification</AuthHeader>
      <div className="fl fl-c fl-d-col">
        {error && <AlertMsg className='mb-1 mt-1' variant="danger" text={error} />}
        {message && <AlertMsg className='mb-1 mt-1' variant="success" text={message} />}
        <p className="text-center pb-2">
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
        <div className="fl fl-j-sb mt-1" style={{ width: '90%', gap: '1rem' }}>
          {emailSent ? (
            <>
              <FormButton
                disabled={disabled}
                onClick={() => {
                  setTimerText(`in 15`);
                  setDisabled(true);
                  handleSubmit();
                }}
                className='w-100'
              >
                Re-send {timerText}
              </FormButton>
              <FormButton
                variant="primary"
                disabled={!currentUser.emailVerified}
                onClick={() => navigate("/")}
                className='w-100'
              >
                Verify
              </FormButton>
            </>
          ) : (
            <FormButton
              variant="outline-primary"
              disabled={disabled}
              onClick={() => {
                setTimerText(`in 15`);
                setDisabled(true);
                handleSubmit();
              }}
              className='w-100'
            >
              Send Verification Email
            </FormButton>
          )}
        </div>
      </div>
    </LoginContainer>
  );
};

export default VerifyEmail;
