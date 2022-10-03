import React, { useState, useEffect, useRef } from "react";
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
      // await setDoc(doc(db, "users", currentUser.uid), {
      //   email: currentUser.email,
      //   uid: currentUser.uid,
      //   displayName: nameRef || currentUser.displayName || "Kuber User",
      //   photoURL: currentUser.photoURL || null,
      // });
      // navigate("/");
      console.log(nameRef || currentUser.displayName || "Kuber User");
    } catch (e) {
      setError({
        variant: "error",
        message: e.code,
      });
    }
    setLoading(false);
  };
  // useEffect(() => {
  //   CreateUserInDb();
  // });
  return (
    <LoginContainer>
      <AuthHeader>Create Profile</AuthHeader>
      {error && (
        <AlertMsg className="mb-1 mt-1" variant={error.variant}>
          {error.message}
        </AlertMsg>
      )}
      <form onSubmit={CreateUserInDb}>
        <div className="mb-1" id="email">
          <FormInput
            type="text"
            label="Enter Your Name"
            ref={nameRef}
            required
          />
        </div>
        <FormButton disabled={loading} className="w-100" type="submit">
          {loading ? "Creating Profile..." : "Create Profile"}
        </FormButton>
      </form>
      <div className="w-100 text-center mt-2">
        <FormButton className="w-100" type="submit" variant="outline">
          Skip
        </FormButton>
      </div>
    </LoginContainer>
  );
};

export default CreateProfile;
