import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postUserFromFirebase } from "../utils/api";
import { auth } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
  "name": "mr",
  "surname": "bean",
  "email": "mr@bean.com",
  "role": "student",
  "disability": "ADHD"
  })

  const [password, setPassword] = useState("");


  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, newUser.email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        postUserFromFirebase(newUser);
        navigate("/login");
      })
      .catch((error) => {
        console.log("🚀 ~ onSubmit ~ error:", error);
      });
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email-address">Email address</label>
          <input
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <button type="submit" onClick={onSubmit}>
          Sign up
        </button>
      </form>
      <p>
        Already have an account? <NavLink to="/login">Sign in</NavLink>
      </p>
    </div>
  );
};

export default Signup;
