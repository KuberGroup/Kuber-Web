import React, { useRef, useState } from "react";
import { Form, Button, Card, FloatingLabel } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { MINI_DESCRIPTION, TITLE, FORM } from "../../Data/Constants";
import { useTitle } from "../../Hooks/useTitle";
import LoginContainer from "../Containers/LoginContainer";
import "./style.css";
import AlertMsg from "../Styles/Alert";

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
          {error && <AlertMsg text={error} />}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="email">
              <FloatingLabel
                controlId="floatingInput"
                label={FORM.label.email.title}
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder={FORM.label.email.placeholder}
                  ref={emailRef}
                  required
                  className="FormInput"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" id="password">
              <FloatingLabel
                controlId="floatingInput"
                label={FORM.label.password.title}
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder={FORM.label.password.placeholder}
                  ref={passwordRef}
                  required
                  className="FormInput"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" id="passwordConfirm">
              <FloatingLabel
                controlId="floatingInput"
                label={FORM.label.confPassword.title}
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder={FORM.label.confPassword.placeholder}
                  ref={passwordConfirmRef}
                  required
                  className="FormInput"
                />
              </FloatingLabel>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              {FORM.signup.title}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to={FORM.haveAccount.url}>
          {FORM.haveAccount.title} {FORM.haveAccount.button}
        </Link>
      </div>
    </LoginContainer>
  );
};

export default SignUp;
