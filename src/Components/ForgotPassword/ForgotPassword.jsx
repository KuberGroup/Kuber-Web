import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { MINI_DESCRIPTION, TITLE, FORM } from "../../Data/Constants";
import { useTitle } from "../../Hooks/useTitle";
import LoginContainer from "../Containers/LoginContainer";
import AuthHeader from "../Headers/AuthHeader";
import AlertMsg from "../Styles/Alert";
import { FormButton } from "../Styles/Button";
import FormInput from "../Styles/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useTitle(`${FORM.recovery.title} - ${TITLE} | ${MINI_DESCRIPTION}`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage(`${FORM.error.reset.success} ${email}`);
    } catch (e) {
      setError(`${FORM.error.reset.failed} ${e.code}`);
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <AuthHeader>{FORM.recovery.title}</AuthHeader>
      {error && <AlertMsg variant="danger" text={error} />}
      {message && <AlertMsg variant="success" text={message} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-1" id="email">
          <FormInput
            handleInputData={setEmail}
            value={email}
            type="email"
            label={FORM.label.email.title}
            required
          />
        </div>

        <FormButton disabled={loading} className="w-100" type="submit">
          {FORM.recovery.button}
        </FormButton>
      </form>
      <div className="w-100 text-center mt-2">
        <Link to={FORM.haveAccount.url}>
          {FORM.haveAccount.knowPassword}{" "}{FORM.haveAccount.button}</Link>
      </div>
    </LoginContainer>
  );
};

export default ForgotPassword;
