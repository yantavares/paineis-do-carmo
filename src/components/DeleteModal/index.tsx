import React from "react";
import { X } from "lucide-react";
import { Container } from "./styles";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Container>
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h1 className="submit-title">Tem certeza?</h1>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="close-btn">
              <X />
            </button>
          </div>
          <div className="modal-content">
            <p style={{ fontSize: "2rem" }}>Tem certeza que quer deletar essa pintura?</p>
          </div>
          <div className="modal-actions">
            <button
              onClick={onConfirm}
              className="submit-btn"
              style={{ fontSize: "1.5rem" }}>
              Sim, Deletar
            </button>
            <button
              onClick={onClose}
              className="cancel-btn"
              style={{ fontSize: "1.5rem" }}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DeleteConfirmationModal;
