import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CarouselImage, CarouselItem } from "./styles";
import Modal from "../EngravingModal";

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

export interface Engraving {
  id: number;
  title: string;
  image: string;
  author: string;
}

interface EngravingCarouselProps {
  engravings: Engraving[];
}

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
