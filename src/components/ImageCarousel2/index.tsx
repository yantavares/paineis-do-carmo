import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageContainer, SliderImage } from "./styles";

const ImageCarousel2 = ({ images }: { images: string[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    fade: true,
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

export default ImageCarousel2;
