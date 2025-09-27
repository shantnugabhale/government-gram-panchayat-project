import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // If there is no user, redirect to the login page
    return <Navigate to="/login" replace />;
  }
  // If the user is logged in, show the page content
  return children;
};

export default ProtectedRoute;