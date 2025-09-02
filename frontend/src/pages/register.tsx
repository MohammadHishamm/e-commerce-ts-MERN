import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { BASE_URL } from "../constants/baseURL";

export const Register = () => {
    const [error,setError] = useState(" ");
  const onSubmit = async () => {
    const firstname = firstNameRef.current?.value;
    const lastname = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),

    });

    if(!response.ok) {
      const errorData = await response.json();
      setError(`Error: ${errorData.message || "Registration failed"}`);
      return;
    }



    const data = await response.json();
    console.log(data);
  };

  

  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          background: "rgba(255,255,255,0.18)", // glassy white
          borderRadius: 3,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          padding: 4,
          minWidth: 320,
          maxWidth: 400,
          backdropFilter: "blur(16px)", // glass effect
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
          Register new account
        </Typography>
        <TextField
          label="First name"
          variant="outlined"
          name="firstName"
          sx={{ mb: 2, background: "rgba(255,255,255,0.8)", borderRadius: 1 }}
          inputRef={firstNameRef}
        />
        <TextField
          label="Last name"
          variant="outlined"
          name="lastName"
          sx={{ mb: 2, background: "rgba(255,255,255,0.8)", borderRadius: 1 }}
          inputRef={lastNameRef}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          sx={{ mb: 2, background: "rgba(255,255,255,0.8)", borderRadius: 1 }}
          inputRef={emailRef}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          inputRef={passwordRef}
          type="password"
          sx={{ mb: 2, background: "rgba(255,255,255,0.8)", borderRadius: 1 }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          name="confirmPassword"
          type="password"
          sx={{ mb: 3, background: "rgba(255,255,255,0.8)", borderRadius: 1 }}
          inputRef={confirmPasswordRef}
        />
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button
          variant="contained"
          color="success"
          onClick={onSubmit}
          sx={{ width: "100%" }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};
