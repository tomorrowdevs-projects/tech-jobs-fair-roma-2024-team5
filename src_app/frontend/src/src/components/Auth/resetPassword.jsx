import React, { useState } from 'react';
import { trpc } from "../../lib/trpc";


const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
 console.log("esisto")
 
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(email)
       
    try {
      const response = await fetch('http://localhost:3000/trpc/resetP.resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        }),
        
      });
      setMessage('Password reimpostata con successo! Controlla la tua email per la nuova password.');
      setEmail('');
      if (!response.ok) {
        throw new Error('Errore durante la registrazione');
      }
      const result = await response.json();
    } catch (ex) {
      setMessage('Errore durante il reset della password. Riprova più tardi.'+ ex);
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
