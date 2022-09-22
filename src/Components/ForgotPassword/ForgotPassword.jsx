import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { MINI_DESCRIPTION, TITLE, FORM } from "../../Data/Constants";
import { useTitle } from "../../Hooks/useTitle";
import LoginContainer from "../Containers/LoginContainer";
import AlertMsg from "../Styles/Alert";

const ForgotPassword = () => {
  const emailRef = useRef();
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
      await resetPassword(emailRef.current.value);
      setMessage(`${FORM.error.reset.success} ${emailRef.current.value}`);
    } catch (e) {
      setError(`${FORM.error.reset.failed} ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{FORM.recovery.title}</h2>
          {error && <AlertMsg variant="danger" text={error} />}
          {message && <AlertMsg variant="success" text={message} />}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="email">
              <Form.Label>{FORM.label.email.title}</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                placeholder={FORM.label.password.placeholder}
                required
              />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              {FORM.recovery.button}
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            {FORM.haveAccount.knowPassword}{" "}
            <Link to={FORM.haveAccount.url}>{FORM.haveAccount.button}</Link>
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

export default ForgotPassword;
