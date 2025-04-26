import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ImageContainer, SliderImage } from "./styles";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const settings = {
    infinite: false,
    cssEase: "linear",
    arrows: true,
    dots: true,
    className: "sl",
  };

  return (
    <Slider {...settings}>
      {images.map((image: string, index: number) => (
        <ImageContainer key={index}>
          <SliderImage src={image} alt="" />
        </ImageContainer>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
