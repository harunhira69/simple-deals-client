import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';


const PrivateRoute = ({ children }) => {
  const { user,loading } = useContext(AuthContext);
  const location = useLocation();

  if(loading){
    return <span className='loading loading-spinner text-success'></span>
  }

  // If user not logged in, redirect to register (or login)
if(user){
  return children;
}

return <Navigate state={{ from: location?.pathname }} to='/register' replace />

};

export default PrivateRoute;
