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

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();

  useTitle(`${FORM.signup.title} - ${TITLE} | ${MINI_DESCRIPTION}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError({
        variant: "error",
        message: FORM.error.passwordNotMatch,
      });

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      navigate("/create-profile");
    } catch (e) {
      setError({
        variant: "error",
        message: `${FORM.error.signup} ${e.code}`,
      });
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <AuthHeader>{FORM.signup.title}</AuthHeader>
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
        <div className="mb-1" id="passwordConfirm">
          <FormInput
            label={FORM.label.confPassword.title}
            type="password"
            ref={passwordConfirmRef}
            required
          />
        </div>
        <FormButton disabled={loading} className="w-100" type="submit">
          {FORM.signup.title}
        </FormButton>
      </form>

      <div className="w-100 text-center mt-2">
        <Link to={FORM.haveAccount.url}>
          {FORM.haveAccount.title} {FORM.haveAccount.button}
        </Link>
      </div>
    </LoginContainer>
  );
};

export default SignUp;
