import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const LogoutModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-aaa"
      overlayClassName="overlay"
    >
      <h2>Confirmação de Logout</h2>
      <p>Deseja realmente sair?</p>
      <div className="modal-buttons">
        <button onClick={onConfirm} className="confirm-button">Confirmar</button>
        <button onClick={onRequestClose} className="cancel-button">Cancelar</button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
