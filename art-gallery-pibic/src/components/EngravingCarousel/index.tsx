import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CarouselImage, CarouselItem } from "./styles";

// From react-multi-carousel docs
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface Engraving {
  id: number;
  title: string;
  image: string;
  author: string;
}

interface EngravingCarouselProps {
  engravings: Engraving[];
}

interface ModalProps {
  engraving: Engraving | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ engraving, onClose }) => {
  if (!engraving) return null;

  return (
    <div
      className="modal-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={(e) => {
        if ((e.target as Element).classList.contains("modal-background")) {
          onClose();
        }
      }}
    >
      <div
        style={{
          background: "lightgray",
          color: "black",
          padding: "20px",
          borderRadius: "10px",
          width: "60%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <h2 style={{ fontSize: "1.2rem" }}>{engraving.author}</h2>
        <img
          src={engraving.image}
          alt={engraving.title}
          style={{ height: "20rem", borderRadius: "10px" }}
        />
        <p>{engraving.title}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const EngravingCarousel = ({ engravings }: EngravingCarouselProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentEngraving, setCurrentEngraving] = useState<Engraving | null>(
    null
  );

  const handleImageClick = (engraving: Engraving) => {
    setCurrentEngraving(engraving);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setCurrentEngraving(null);
    setIsModalVisible(false);
  };

  return (
    <div>
      <Carousel
        arrows={false}
        swipeable={true}
        autoPlay={autoPlay}
        infinite={true}
        responsive={responsive}
        showDots={true}
        focusOnSelect={true}
        centerMode={true}
        autoPlaySpeed={2000}
        transitionDuration={2000}
        customTransition="transform 2000ms ease-in-out"
      >
        {engravings.map((engraving: Engraving) => (
          <CarouselItem
            key={engraving.id}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <CarouselImage
              src={engraving.image}
              alt={engraving.title}
              onClick={() => handleImageClick(engraving)}
            />
            {engraving.author}
          </CarouselItem>
        ))}
      </Carousel>
      {isModalVisible && (
        <Modal engraving={currentEngraving} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default EngravingCarousel;
