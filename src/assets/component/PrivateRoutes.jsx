import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../contextAPI/ProfileContext";

const PrivateRoutes = ({ allowedRoles }) => {
  const { user } = useProfile();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to unauthorized page if role is not allowed
    return <Navigate to="/unauthorized" />;
  }

  // Allow access to protected routes
  return <Outlet />;
};

export default PrivateRoutes;
