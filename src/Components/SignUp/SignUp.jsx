import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { MINI_DESCRIPTION, TITLE, FORM } from "../../Data/Constants";
import { useTitle } from "../../Hooks/useTitle";
import LoginContainer from "../Containers/LoginContainer";
import "./style.css";
import AlertMsg from "../Styles/Alert";
import FormInput from "../Styles/Input";
import { FormButton } from "../Styles/Button";
import AuthHeader from "../Headers/AuthHeader";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  useTitle(`${FORM.signup.title} - ${TITLE} | ${MINI_DESCRIPTION}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm)
      return setError(`${FORM.error.passwordNotMatch}`);

    try {
      setError("");
      setLoading(true);
      await signup(email, password);

      navigate("/");
    } catch {
      setError(`${FORM.error.signup}`);
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <AuthHeader>{FORM.signup.title}</AuthHeader>
      {error && <AlertMsg text={error} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-1" id="email">
          <FormInput
            handleInputData={setEmail}
            value={email}
            label={FORM.label.email.title}
            type="email"
            required
          />
        </div>
        <div className="mb-1" id="password">
          <FormInput
            handleInputData={setPassword}
            value={password}
            label={FORM.label.password.title}
            type="password"
            required
          />
        </div>
        <div className="mb-1" id="passwordConfirm">
          <FormInput
            handleInputData={setPasswordConfirm}
            value={passwordConfirm}
            label={FORM.label.confPassword.title}
            type="password"
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
