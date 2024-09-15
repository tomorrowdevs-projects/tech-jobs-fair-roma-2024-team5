import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate } from "react-router-dom";

function Login() {
  const { authInfo, login } = useContext(AuthContext) || {};

  if (!!authInfo) {
    return <Navigate to="/home"></Navigate>;
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
    <div className="container mt-5 card p-3 text-center custom_card allinea_div">
      <h4 className="mb-3 font_IBM">Ciao, sei già registrato?</h4>
      <div className="allinea_div">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Inserisci la tua email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="inserisci la tua password"
            />
          </div>
          <button type="submit" className="btn btn-primary custom-button">
            Accedi al tuo account
          </button>

          <div className="mt-3">
            <a href="/auth/register" className="text-decoration-none">
              Password dimenticata?
            </a>
            <p>Non hai ancora un account?</p>
            <button
              type="button"
              className="btn btn-primary custom-button"
              onClick={() => (window.location.href = "/auth/register")}
            >
              Registra il tuo account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
