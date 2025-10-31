import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/api';

const PrivateRoute = ({ children }) => {
  const user = authService.currentUser();
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
