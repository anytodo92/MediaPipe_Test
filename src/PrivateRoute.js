import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
