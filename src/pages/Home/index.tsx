import HomeSearch from "src/components/HomeSearch";
import React from "react";
import ImageCarousel from "src/components/ImageCarousel";
import temp from "src/assets/baroque.jpg";
import temp2 from "src/assets/baroque3.jpg";
import temp3 from "src/assets/igreja2.jpg";
import temp4 from "src/assets/baroque2.jpg";
import temp5 from "src/assets/pintura2.jpeg";
import temp6 from "src/assets/artista1.jpg";
import {
  CarouselContainer,
  PaddingContainer,
  Topic,
  TopicBody,
  TopicHeader,
  TopicSubTitle,
  TopicTitle,
  TopicsContainer,
} from "./styles";
import RoundBox from "./RoundBox";
import HomeTopic from "./HomeTopic";
import {
  brazilianArtists,
  brazilianChurches,
  brazilianPaintings,
} from "./mockData";

const Home = () => {
  return (
    <div>
      <PaddingContainer>
        <HomeSearch />
      </PaddingContainer>
      <CarouselContainer>
        <ImageCarousel images={[temp, temp2, temp3, temp4, temp5, temp6]} />
      </CarouselContainer>
      <PaddingContainer>
        <TopicsContainer>
          <Topic>
            <TopicHeader>
              <TopicTitle>Como utilizar</TopicTitle>
              <TopicSubTitle>
                Formas que você pode usufruir do nosso site
              </TopicSubTitle>
            </TopicHeader>
            <TopicBody>
              <RoundBox
                text={"Utilizar como visitante"}
                buttonText={"Como utilizar"}
                color={"#3A5A40"}
              />
              <RoundBox
                text={"Fazer parte do projeto"}
                buttonText={"Fazer parte"}
                color={"#588157"}
              />
              <RoundBox
                text={"Entrar em contato conosco"}
                buttonText={"Entrar em contato"}
                color={"#A3B18A"}
              />
            </TopicBody>
          </Topic>
          <Topic>
            <TopicHeader>
              <TopicTitle>Igrejas</TopicTitle>
              <TopicSubTitle>
                Procure por igrejas do período barroco brasileiro
              </TopicSubTitle>
            </TopicHeader>
            <HomeTopic type={"churches"} data={brazilianChurches} />
          </Topic>
          <Topic>
            <TopicHeader>
              <TopicTitle>Obras</TopicTitle>
              <TopicSubTitle>
                Procure por pinturas do período barroco brasileiro
              </TopicSubTitle>
            </TopicHeader>
            <HomeTopic type={"paintings"} data={brazilianPaintings} />
          </Topic>
          <Topic>
            <TopicHeader>
              <TopicTitle>Artistas</TopicTitle>
              <TopicSubTitle>
                Procure por artistas do barrroco brasileiro
              </TopicSubTitle>
            </TopicHeader>
            <HomeTopic type={"artists"} data={brazilianArtists} />
          </Topic>
        </TopicsContainer>
      </PaddingContainer>
    </div>
  );
};
export default Home;