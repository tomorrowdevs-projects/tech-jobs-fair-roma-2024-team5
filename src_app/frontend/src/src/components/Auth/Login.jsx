import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usa `useNavigate` per il reindirizzamento

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook per il reindirizzamento

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impedisce il comportamento predefinito del modulo

    try {
      // Invia i dati di login al server
      const response = await fetch('http://localhost:3001/trpc/auth.login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { 
            email,
            password
          }
        }),
        credentials: 'include', 
      });
      

      // Verifica se la risposta è positiva
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      if (data.result && data.result.success) {
        // Reindirizza alla dashboard se il login ha successo
        navigate('/dashboard');
      } else {
        // Gestisci errori di login
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="container mt-5 card p-3 text-center custom_card allinea_div">
      <h4 className="mb-3 font_IBM">Ciao, sei già registrato?</h4>
      <div className="allinea_div">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Inserisci la tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary custom-button">
            Accedi al tuo account
          </button>

          <div className="mt-3">
            <a href="/auth/register" className="text-decoration-none">Password dimenticata?</a>
            <p>Non hai ancora un account?</p>
            <button
              type="button"
              className="btn btn-primary custom-button"
              onClick={() => navigate('/auth/register')} // Usa `navigate` per il reindirizzamento
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
