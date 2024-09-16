import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null); // Stato per gestire errori
  const [success, setSuccess] = useState(false); // Stato per gestire successi

  // Gestore per aggiornare i campi del form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestore per la sottomissione del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Controllo se le password coincidono
    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono');
      return;
    }

    // Chiamata API per registrare l'utente
    try {
      const response = await fetch('http://localhost:3000/trpc/user.create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Errore durante la registrazione');
      }

      const result = await response.json();

      setSuccess(true); // Imposta il successo
      setError(null); // Resetta gli errori

      // Resetta i campi del form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (ex) {
      setError('Errore durante la registrazione. Riprova.'); // Imposta l'errore
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5 card p-3 text-center custom_card allinea_div">
      <h2 className="text-2xl font-bold mb-4">Registrazione</h2>

      {/* Mostra eventuali messaggi di errore */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostra il messaggio di successo */}
      {success && <p className="text-green-500">Registrazione avvenuta con successo!</p>}

      <div className="allinea_div">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Nome utente"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Conferma Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="btn btn-primary custom-button">
            Registrati
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
