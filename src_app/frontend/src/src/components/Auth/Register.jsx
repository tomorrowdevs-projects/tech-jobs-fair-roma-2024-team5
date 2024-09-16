import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form inviato:', formData);
  };

  return (

        <div className="container mt-5 card p-3 text-center custom_card allinea_div">
          
            <h2 className="text-2xl font-bold mb-4">Registrazione</h2>
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
              <button
                type="submit"
                className="btn btn-primary custom-button"
              >
                Registrati
              </button>
            </form>
            </div>
        </div>
   
  );
};

export default Register;