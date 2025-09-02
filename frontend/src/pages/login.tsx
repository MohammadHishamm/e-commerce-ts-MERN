import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/auth/auth";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const [error,setError] = useState(" ");
     const {login} = useAuth();
     const navigate = useNavigate();



  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
  
    if ( !email || !password) {
      return setError("All fields are required");
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),

    });

    if(!response.ok) {
      const errorData = await response.json();
      setError(`Error: ${errorData.message || "Incorrect info"}`);
      return;
    }



    const token = await response.json();
    if(!token){
      setError("Incorrect token");
      return;
    }

    login(email,token);
    navigate("/");


    console.log(token);
  };

  

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

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
          Login
        </Typography>
       
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
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button
          variant="contained"
          color="success"
          onClick={onSubmit}
          sx={{ width: "100%" }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};
