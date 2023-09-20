import { useEffect, useState } from "react";
import { NavbarTeacher } from "./NavbarTeacher";
import { NavbarStudent } from "./NavbarStudent";
import { signOut } from "firebase/auth";
import * as React from "react";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { LoginButton } from "./LoginButton";
import {auth} from './../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export const Navbar = ({user}) => {
  const navigate = useNavigate()

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

  let userStatus = null;

  if(user === "logged out"){
    userStatus = <LoginButton/>;
  }else if (user === "null"){
    userStatus = "";
  }else if (user && user.role === "student"){
    userStatus = <NavbarStudent handleLogout={handleLogout} />;
  }else if (user && user.role === "teacher"){
    userStatus = <NavbarTeacher handleLogout={handleLogout}/>;
  }


  return (
    <Container
      sx={{
        textAlign: "right",
        borderBottom: 1,
        maxWidth: 11 / 12,
        display: "flex",
        justifyContent: "space-between",
        mb: 5
      }}
    >
      <Typography sx={{ fontSize: 60, fontWeight: "bold" }}><Link to="/">sensAI</Link></Typography>
      {userStatus}
      
    </Container>
  );


};
