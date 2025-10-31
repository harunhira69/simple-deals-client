import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // If user not logged in, redirect to register (or login)
  if (!user) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  // If logged in, show the protected content
  return children;
};

export default PrivateRoute;
