import React, { useEffect, ReactNode } from "react";
import { Container } from "./styles";
import { X } from "lucide-react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <Container
      onClick={onClose}
      aria-modal="true"
      role="dialog">
      <div
        className="modal-content"
        onClick={handleContainerClick}>
        {children}
      </div>
    </Container>
  );
};

export default Modal;
