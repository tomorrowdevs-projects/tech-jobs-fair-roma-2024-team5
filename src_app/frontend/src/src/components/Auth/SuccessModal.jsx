import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="c">
        <div className="modal-content">
          <p><strong>Registrazione avvenuta con successo! Ora puoi accedere.</strong></p>
          <button onClick={onClose} className="modal-close-button">Chiudi</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;