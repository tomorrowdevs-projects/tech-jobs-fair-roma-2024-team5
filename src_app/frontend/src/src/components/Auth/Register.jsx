import React, { useState } from "react";
import { trpc } from "../../lib/trpc";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      setError("Le password non coincidono");
      return;
    }

    try {
      await trpc.user.create.mutate({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(true); // Imposta il successo
      setError(null); // Resetta gli errori

      // Resetta i campi del form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (ex) {
      setError("Errore durante la registrazione. Riprova."); // Imposta l'errore
      setSuccess(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Registrazione</h2>

        {/* Mostra eventuali messaggi di errore */}
        {error && <p className="error-message">{error}</p>}

        {/* Mostra il messaggio di successo */}
        {success && (
          <p className="success-message">Registrazione avvenuta con successo!</p>
        )}

        <div className="form-group">
          <label htmlFor="username">Nome utente</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Inserisci il tuo nome utente"
            value={formData.username}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Inserisci la tua email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Inserisci la tua password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Conferma Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Conferma la tua password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="register-input"
          />
        </div>

        <button type="submit" className="register-button">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default Register;
