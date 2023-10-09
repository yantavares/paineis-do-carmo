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

const EngravingCarousel = ({ engravings }: EngravingCarouselProps) => {
  const [autoPlay, setAutoPlay] = useState(true);

  const handleMouseEnter = () => {
    setAutoPlay(false);
  };

  const handleMouseLeave = () => {
    setAutoPlay(true);
  };
  return (
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
      pauseOnHover={true}
    >
      {engravings.map((engraving: Engraving) => (
        <CarouselItem
          key={engraving.id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselImage src={engraving.image} alt={engraving.title} />
          {engraving.author}
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default EngravingCarousel;
