import React, { useEffect, ReactNode } from "react";
import { Container, ModalContent } from "./styles";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const lockScroll = () => {
  document.body.style.overflow = "hidden";
};

const unlockScroll = () => {
  document.body.style.overflow = "";
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      lockScroll();
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      unlockScroll();
      document.removeEventListener("keydown", handleEscapeKey);
    }
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Container
      aria-modal="true"
      role="dialog">
      <ModalContent
        className="modal-content"
        onClick={handleContainerClick}>
        {children}
      </ModalContent>
    </Container>
  );
};

export default Modal;
