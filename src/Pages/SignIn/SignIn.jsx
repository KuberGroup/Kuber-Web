import React, { useState, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { MINI_DESCRIPTION, TITLE, FORM } from "../../Data/Constants";
import { useTitle } from "../../Hooks/useTitle";
import {
  AlertMsg,
  FormButton,
  FormInput,
  LoginContainer,
  AuthHeader,
} from "../../Components";

const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { signin } = useAuth();

  const navigate = useNavigate();

  useTitle(`${FORM.signin.title} - ${TITLE} | ${MINI_DESCRIPTION}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);

      navigate("/");
    } catch (e) {
      setError({
        variant: "error",
        message: `${FORM.error.signin} ${e.code}`,
      });
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <AuthHeader>{FORM.signin.title}</AuthHeader>
      {error && (
        <AlertMsg variant={error.variant} className="mb-1 mt-1">
          {error.message}
        </AlertMsg>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-1" id="email">
          <FormInput
            label={FORM.label.email.title}
            type="email"
            ref={emailRef}
            required
          />
        </div>
        <div className="mb-1" id="password">
          <FormInput
            label={FORM.label.password.title}
            type="password"
            ref={passwordRef}
            required
          />
        </div>
        <FormButton disabled={loading} className="w-100" type="submit">
          {FORM.signin.title}
        </FormButton>
      </form>

      <div className="w-100 text-center mt-2 fl fl-j-sb">
        <Link to={FORM.resetPasswword.url}>
          {FORM.resetPasswword.title} {FORM.resetPasswword.button}
        </Link>
        <Link to={FORM.noAccount.url}>
          {FORM.noAccount.title} {FORM.noAccount.button}
        </Link>
      </div>
    </LoginContainer>
  );
};

export default SignIn;
