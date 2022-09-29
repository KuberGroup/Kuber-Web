import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { MINI_DESCRIPTION, TITLE, FORM } from "../../Data/Constants";
import { useTitle } from "../../Hooks/useTitle";
import {
  AlertMsg,
  FormButton,
  FormInput,
  LoginContainer,
  AuthHeader,
} from "../../Components";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useTitle(`${FORM.recovery.title} - ${TITLE} | ${MINI_DESCRIPTION}`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setError({
        variant: "success",
        message: `${FORM.error.reset.success} ${emailRef.current.value}`,
      });
    } catch (e) {
      setError({
        variant: "error",
        message: `${FORM.error.reset.failed} ${e.code}`,
      });
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <AuthHeader>{FORM.recovery.title}</AuthHeader>
      {error && (
        <AlertMsg className="mb-1 mt-1" variant={error.variant}>
          {error.message}
        </AlertMsg>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-1" id="email">
          <FormInput
            type="email"
            label={FORM.label.email.title}
            ref={emailRef}
            required
          />
        </div>

        <FormButton disabled={loading} className="w-100" type="submit">
          {FORM.recovery.button}
        </FormButton>
      </form>
      <div className="w-100 text-center mt-2">
        <Link to={FORM.haveAccount.url}>
          {FORM.haveAccount.knowPassword} {FORM.haveAccount.button}
        </Link>
      </div>
    </LoginContainer>
  );
};

export default ForgotPassword;
