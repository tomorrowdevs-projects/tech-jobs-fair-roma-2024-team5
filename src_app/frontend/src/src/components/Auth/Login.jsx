import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


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
    <div className="container mt-5 card p-3 text-center custom_card allinea_div">
      <h4 className="mb-3 font_IBM">Ciao, sei già registrato?</h4>
      <div>
        <form onSubmit={onSubmit} className="mb-3">
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
            <a href="" className="text-decoration-none">Password dimenticata?</a>
            <p>Non hai ancora un account?</p>
            
          </div>
          
        </form>
        <button
      type="button"
      className="btn btn-primary custom-button"
      onClick={() => navigate('/auth/register')}
    >
      Registra il tuo account
    </button>
      </div>
    </div>
  );
}

export default Login;
