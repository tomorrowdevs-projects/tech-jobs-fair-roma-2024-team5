import React, { useState } from 'react';
import { trpc } from "../../lib/trpc";


const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
 console.log("esisto")
  // Usando trpc per chiamare la mutazione
  const resetPasswordMutation = trpc.auth.resetPassword.useMutation();
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simula la chiamata all'endpoint
      await resetPasswordMutation.mutateAsync({ email });
      setMessage('Password reimpostata con successo! Controlla la tua email per la nuova password.');
      setEmail('');
    } catch (error) {
      // Visualizza un messaggio di errore
      setMessage('Errore durante il reset della password. Riprova più tardi.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Reimposta Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Reimposta Password</button>
          </form>
          {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
