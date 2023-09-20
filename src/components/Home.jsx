import React from "react";
import { LoginButton } from "./LoginButton";

const Home = ({ user }) => {
  let userStatus = null;

  if (user === "logged out") {
    userStatus = `You are logged out!`;
  } else if (user === "null") {
    userStatus = "";
  } else if (user && user.role === "student") {
    userStatus = `Hello ${user.name} you are a student`;
  } else if (user && user.role === "teacher") {
    userStatus = `Hello ${user.name} you are a teacher`;
  }

  return (
    <>
      <div>Welcome to SensAI!</div>{userStatus}
    </>
  );
};

export default Home;
