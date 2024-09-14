import React from 'react';

function Login() {
  return (

    <div className="container mt-5 card p-3 text-center custom_card">
      <h4 className="mb-3 font-IBM">Ciao, sei già registrato?</h4>
      <div className="allinea_div">
        <form>
        <div className="mb-3">
     
          <input type="email" className="form-control" id="email" placeholder="Inserisci la tua email" />
        </div>
        <div className="mb-3">
  
          <input type="password" className="form-control" id="password" placeholder="inserisci la tua password" />
        </div>
        <button type="submit" className="btn btn-primary custom-button">Accedi al tuo account</button>

      <div className="mt-3">
        <a href="/auth/register" className="text-decoration-none">Password dimenticata?</a>
        <p>Non hai ancora un account?</p>
        <button type="button" className="btn btn-primary custom-button" onClick={() => window.location.href="/auth/register"}>Registra il tuo account</button>
      </div>
      </form>
      </div>
      
    </div>
  );
}

export default Login;
