import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Link as MUILink,
  Alert,
  Divider,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { postNewUser } from "../utils/api";
import { auth } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    name: "test",
    surname: "test",
    email: "@test.com",
    password: "!QAZ2wsx",
    confirmPassword: "!QAZ2wsx",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setError("Passwords do not match.");
      setPosting(false);
      return;
    }else if (newUser.password.length < 8){
      setError("Password length needs to be 8 characters");
      setPosting(false);
      return;
    }else if (!/[A-Z]/.test(newUser.password)){
      setError("Password requires an upper and lower case letter")
      setPosting(false);
      return;
    }else if (!/.*[0-9].*/.test(newUser.password)){
      setError("Password requires a number")
      setPosting(false);
      return;
    }
    
    setPosting(false);
      try {
        await createUserWithEmailAndPassword(
          auth,
          newUser.email,
          newUser.password
        );
        await postNewUser(newUser);
        navigate("/");
      } catch (error) {
        //console.log("Error during account creation: ", error);
      }
      let errorMessage = "";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/email-already-in-use":
          errorMessage =
            "The email address is already in use by another account.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        default:
          errorMessage = "Failed to create an account. Please try again.";
      }
  
      setError(errorMessage);
      setPosting(false);

  };

  const handleChange = (event) => {
    const newUserState = { ...newUser, [event.target.id]: event.target.value };
    setNewUser(newUserState);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Create an Account
      </Typography>
      {error && (
        <>
          <Alert severity="error">{error}</Alert>
          <Divider variant="middle" style={{ margin: "16px 0" }} />
        </>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              id="name"
              label="Name"
              value={newUser.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              id="surname"
              label="Surname"
              value={newUser.surname}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              id="email"
              label="Email"
              value={newUser.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              id="password"
              label="Password"
              value={newUser.password}
              onChange={handleChange}
              type="password"
              fullWidth
              required
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              value={newUser.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              type="password"
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          endIcon={<SendIcon />}
          loading={posting}
          loadingPosition="end"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Create Account
        </LoadingButton>
      </form>
      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        Already have an account?{" "}
        <MUILink component={NavLink} to="/login" underline="hover">
          Sign in
        </MUILink>
      </Typography>
    </Container>
  );
};

export default Signup;
