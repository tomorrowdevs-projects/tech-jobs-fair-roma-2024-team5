import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import logo from'../logo.png'

function Auth() {
  return (
    <>
    <div className="navbar mt-3">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <span className="navbar-text">MyHabix</span>
    </div>
    <div className="auth-container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    </>
  );
}

export default Auth;
