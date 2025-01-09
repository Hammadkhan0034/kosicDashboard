import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); 
  // console.log('auth token is ', authToken)

  return authToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
