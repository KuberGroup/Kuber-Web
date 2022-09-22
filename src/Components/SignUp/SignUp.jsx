import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { MINI_DESCRIPTION, TITLE, FORM } from "../../Data/Constants";
import { useTitle } from "../../Hooks/useTitle";
import LoginContainer from "../Containers/LoginContainer";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  useTitle(`${FORM.signup.title} - ${TITLE} | ${MINI_DESCRIPTION}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError(`${FORM.error.passwordNotMatch}`);

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      navigate("/");
    } catch {
      setError(`${FORM.error.signup}`);
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{FORM.signup.title}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="email">
              <Form.Label>{FORM.label.email.title}</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder={FORM.label.email.placeholder}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" id="password">
              <Form.Label>{FORM.label.password.title}</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder={FORM.label.password.placeholder}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" id="passwordConfirm">
              <Form.Label>{FORM.label.confPassword.title}</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder={FORM.label.confPassword.placeholder}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              {FORM.signup.title}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {FORM.haveAccount.title}{" "}
        <Link to={FORM.haveAccount.url}>{FORM.haveAccount.button}</Link>
      </div>
    </LoginContainer>
  );
};

export default SignUp;
