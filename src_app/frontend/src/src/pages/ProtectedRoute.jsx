import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

export default function ProtectedRoute () {
  const { authInfo } = useContext(AuthContext) || {};

  if (!authInfo) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};