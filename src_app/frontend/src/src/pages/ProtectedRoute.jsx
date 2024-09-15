import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

export default function ProtectedRoute () {
  const { authInfo } = useContext(AuthContext) || {};

  // authInfo not fetched yet
  if (typeof authInfo === 'undefined' ) {
    return <></>
  }

  if (!authInfo) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};