import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const { authInfo, login } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!!authInfo) {
    return <Navigate to="/"></Navigate>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    login({
      email: email.value,
      password: password.value,
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
        <h2 className="login-title">Accedi al tuo account</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="login-input"
            id="email"
            name="email"
            placeholder="Inserisci la tua email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="login-input"
            id="password"
            name="password"
            placeholder="Inserisci la tua password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Accedi
        </button>
        <div className="login-links">
          <a href="#" className="forgot-password">Password dimenticata?</a>
          <p className="register-link">
            Non hai ancora un account?{" "}
            <button type="button" className="register-button" onClick={() => navigate('/auth/register')}>
              Registrati
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
