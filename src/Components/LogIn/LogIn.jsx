import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FORM, MINI_DESCRIPTION, TITLE } from "../../Data/Constants";
import { useTitle } from "../../Hooks/useTitle";
import LoginContainer from "../Containers/LoginContainer";

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useTitle(`${FORM.login.title} - ${TITLE} | ${MINI_DESCRIPTION}`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError(`${FORM.error.login} ${e.code}`);
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{FORM.login.title}</h2>
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
            <Button disabled={loading} className="w-100" type="submit">
              {FORM.login.title}
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            <Link to={FORM.resetPasswword.url}>
              {FORM.resetPasswword.title}
            </Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        {FORM.noAccount.title}{" "}
        <Link to={FORM.noAccount.url}>{FORM.noAccount.button}</Link>
      </div>
    </LoginContainer>
  );
};

export default LogIn;
