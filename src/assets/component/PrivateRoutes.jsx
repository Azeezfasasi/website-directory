// import { Navigate, Outlet } from 'react-router-dom';
// import { useProfile } from '../contextAPI/ProfileContext';

// const PrivateRoutes = ({ allowedRoles }) => {
//   const { user, loading } = useProfile();

//   if (loading) return <p>Loading...</p>;

//   // Redirect if no user or token
//   if (!user) return <Navigate to="/" replace />;

//   // Check if user role is allowed
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />; // Render child components
// };

// export default PrivateRoutes;

// PrivateRoutes.js
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
