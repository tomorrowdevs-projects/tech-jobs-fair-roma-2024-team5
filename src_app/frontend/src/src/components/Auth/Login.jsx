import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import SuccessModal from "./SuccessModal";

function Login() {
  const { authInfo, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('registered') === 'true') {
      setShowSuccessModal(true);
      // Rimuovi il parametro dall'URL
      navigate('/auth/login', { replace: true });
    }
  }, [location, navigate]);

  if (!!authInfo) {
    return <Navigate to="/"></Navigate>;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { email, password } = e.target.elements;
    const result = await login({
      email: email.value,
      password: password.value,
    });

    if (!result) {
      setError("Credenziali non valide. Per favore, riprova.");
      console.log("tutto sbagliato");
    }
  };

  return (
    <div className="login-container">
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
      <form onSubmit={onSubmit} className="login-form">
        <h2 className="login-title">Accedi al tuo account</h2>
        {error && <div className="error-message">{error}</div>}
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
