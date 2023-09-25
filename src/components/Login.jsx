import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import {
  TextField,
  Container,
  Typography,
  Link as MUILink,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        //console.log(errorCode, error.message);

        let errorMessage =
          errorCode === "auth/invalid-login-credentials"
            ? "Invalid email or password."
            : "An unknown error occurred. Please try again.";
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={onLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          loading={loading}
        >
          Login
        </LoadingButton>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: "16px" }}>
        No account yet?{" "}
        <MUILink component={NavLink} to="/signup" underline="hover">
          Sign up
        </MUILink>
      </Typography>
      <Typography variant="body2" align="center">
        Forgotten password?{" "}
        <MUILink component={NavLink} underline="hover">
          Reset Password
        </MUILink>
      </Typography>

      <p>Student:</p>
      <p>user4.surname4@gmail.com</p>

      <p>Teacher:</p>
      <p>user101.surname101@yahoo.com</p>
    </Container>
  );
};

export default Login;
