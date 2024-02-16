import HomeSearch from "src/components/HomeSearch";
import React from "react";
import Header from "src/components/Header";
import ImageCarousel from "src/components/ImageCarousel";
import temp from "src/assets/baroque.jpg";
import { CarouselContainer, PaddingContainer } from "./style";

const Home = () => {
  return (
    <div>
      <PaddingContainer>
        <Header />
        <HomeSearch />
      </PaddingContainer>
      <CarouselContainer>
        <ImageCarousel images={[temp, temp, temp, temp, temp, temp]} />
      </CarouselContainer>
    </div>
  );
};
export default Home;
