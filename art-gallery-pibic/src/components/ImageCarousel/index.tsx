import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageContainer, SliderImage } from "./styles";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 150000,
    slidesToShow: 3,
    slidesToScroll: images.length,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    fade: false,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {images.map((image: string, index: number) => (
        <ImageContainer key={index}>
          <SliderImage src={image} alt={`Slide ${index}`} />
        </ImageContainer>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
