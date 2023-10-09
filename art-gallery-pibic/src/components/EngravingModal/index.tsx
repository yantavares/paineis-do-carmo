import { Engraving } from "../EngravingCarousel";
import {
  ModalAuthor,
  ModalBackground,
  ModalContainer,
  ModalImage,
} from "./styles";

interface ModalProps {
  engraving: Engraving | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ engraving, onClose }) => {
  if (!engraving) return null;

  return (
    <ModalBackground
      onClick={(e) => {
        if ((e.target as Element).classList.contains("modal-background")) {
          onClose();
        }
      }}
    >
      <ModalContainer>
        <ModalAuthor>{engraving.author}</ModalAuthor>
        <ModalImage src={engraving.image} alt={engraving.title} />
        <p>{engraving.title}</p>
        <button onClick={onClose}>Close</button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
