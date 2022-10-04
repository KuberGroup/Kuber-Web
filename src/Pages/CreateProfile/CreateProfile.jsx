import React, { useState, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  AlertMsg,
  AuthHeader,
  FormButton,
  FormInput,
  LoginContainer,
} from "../../Components";
import { doc, setDoc } from "firebase/firestore";

const CreateProfile = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const navigate = useNavigate();
  const CreateUserInDb = async () => {
    try {
      setError("");
      setLoading(true);
      await setDoc(doc(db, "users", currentUser.uid), {
        email: currentUser.email,
        uid: currentUser.uid,
        displayName:
          nameRef.current.value || currentUser.displayName || "Kuber User",
        photoURL: currentUser.photoURL || null,
      });
      navigate("/");
    } catch (e) {
      setError({
        variant: "error",
        message: e.code,
      });
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameRef.current.value === "")
      return setError({ variant: "error", message: "Please enter a name" });
    CreateUserInDb();
  };

  const Skip = () => {
    nameRef.current.value = "";
    CreateUserInDb();
  };

  return (
    <LoginContainer>
      <AuthHeader>Create Profile</AuthHeader>
      {error && (
        <AlertMsg className="mb-1 mt-1" variant={error.variant}>
          {error.message}
        </AlertMsg>
      )}
      <form onSubmit={handleSubmit} onReset={Skip}>
        <div className="mb-1" id="email">
          <FormInput type="text" label="Enter Your Name" ref={nameRef} />
        </div>
        <div className="fl" style={{ gap: "1rem" }}>
          <FormButton className="w-100" type="reset" variant="outline">
            Skip
          </FormButton>
          <FormButton disabled={loading} className="w-100" type="submit">
            {loading ? "Creating Profile..." : "Create Profile"}
          </FormButton>
        </div>
      </form>
    </LoginContainer>
  );
};

export default CreateProfile;
