import React, { use } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/auth/auth";

export const ProtectedRoute = () => {
  const { isAuth } = useAuth(); // Assuming you have a useAuth hook to get authentication status

  if (!isAuth) {
    console.log("User is not authenticated");
    return <Navigate to="/login" replace />;
  }
};
