import * as React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

import { AuthContext } from "../contexts/AuthContext";

import "../styles/AuthenticationPage.css";

export default function AuthenticationPage() {

  let navigate = useNavigate();


  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const {
    handleRegister,
    handleLogin
  } = React.useContext(AuthContext);


  let handleAuth = async () => {

    try {

      if (formState === 0) {

        await handleLogin(
          username,
          password
        );

      }

      if (formState === 1) {

        let result = await handleRegister(
          name,
          username,
          password
        );

        console.log(result);

        setMessage(result);
        setOpen(true);

        setError("");

        setFormState(0);

        setPassword("");
        setUsername("");
        setName("");
      }

    } catch (err) {

      console.log(err);

      // You can enable your error handling here later
      // let message = err.response.data.message;
      // setError(message);

    }
  };


  return (
    <div className="authPage">
      <div
        className="authTopLogo"
        onClick={() => {
          navigate("/");
        }}
        style={{cursor:"pointer"}}
      >
        Nex<span>Meet</span>
      </div>

      <div className="authFormWrapper">
        <div className="authFormCard">
          {/* HEADER */}

          <div className="authFormHeader">
            <h2>Welcome to NexMeet</h2>

            <p>
              {formState === 0
                ? "Sign in to continue to your meetings"
                : "Create your account and start connecting"}
            </p>
          </div>

          {/* SIGN IN / SIGN UP */}

          <div className="authTabs">
            <button
              type="button"
              className={formState === 0 ? "authTab active" : "authTab"}
              onClick={() => {
                setFormState(0);
                setError("");
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              className={formState === 1 ? "authTab active" : "authTab"}
              onClick={() => {
                setFormState(1);
                setError("");
              }}
            >
              Sign Up
            </button>
          </div>

          {/* FORM */}

          <Box component="form" className="authForm" noValidate>
            {/* FULL NAME - SIGN UP ONLY */}

            {formState === 1 && (
              <TextField
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                value={name}
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                className="authInput"
              />
            )}

            {/* USERNAME */}

            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              autoFocus={formState === 0}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className="authInput"
            />

            {/* PASSWORD */}

            <TextField
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="authInput"
            />

            {/* ERROR */}

            {error && <p className="authError">{error}</p>}

            {/* SUBMIT */}

            <Button
              type="button"
              fullWidth
              variant="contained"
              className="authSubmit"
              onClick={handleAuth}
            >
              {formState === 0 ? "Login" : "Create Account"}

              <span>→</span>
            </Button>
          </Box>

          {/* BOTTOM SWITCH */}

          <p className="authFooter">
            {formState === 0
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() => {
                setFormState(formState === 0 ? 1 : 0);

                setError("");
              }}
            >
              {formState === 0 ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {/* PRIVACY */}

        <p className="authPrivacy">
          🔐 Your privacy and security are our top priority.
        </p>
      </div>

      {/* SNACKBAR */}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}