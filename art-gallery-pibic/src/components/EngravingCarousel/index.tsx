import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import temp from "../../assets/temp.png";
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

const EngravingCarousel = () => {
  return (
    <Carousel
      arrows={false}
      swipeable={true}
      autoPlay={true}
      infinite={true}
      responsive={responsive}
      showDots={true}
      focusOnSelect={true}
      centerMode={true}
      autoPlaySpeed={3000}
      transitionDuration={3000}
      customTransition="transform 3000ms ease-in-out"
    >
      <CarouselItem>
        <CarouselImage src={temp} alt="" />
        Item 1
      </CarouselItem>
      <CarouselItem>
        <CarouselImage src={temp} alt="" />
        Item 2
      </CarouselItem>
      <CarouselItem>
        <CarouselImage src={temp} alt="" />
        Item 3
      </CarouselItem>
      <CarouselItem>
        <CarouselImage src={temp} alt="" />
        Item 4
      </CarouselItem>
    </Carousel>
  );
};

export default EngravingCarousel;
