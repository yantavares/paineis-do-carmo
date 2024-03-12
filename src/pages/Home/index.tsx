import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import temp6 from "src/assets/artista1.jpg";
import temp from "src/assets/baroque.jpg";
import temp4 from "src/assets/baroque2.jpg";
import temp2 from "src/assets/baroque3.jpg";
import temp3 from "src/assets/igreja2.jpg";
import temp5 from "src/assets/pintura2.jpeg";
import HomeSearch from "src/components/HomeSearch";
import ImageCarousel from "src/components/ImageCarousel";
import ImageCarousel2 from "src/components/ImageCarousel2";
import HomeTopic from "./HomeTopic";
import RoundBox from "./RoundBox";
import {
  brazilianArtists,
  brazilianChurches,
  brazilianPaintings,
} from "./mockData";
import {
  CarouselContainer,
  MainText,
  MainTextContainer,
  MainTextHeader,
  PaddingContainer,
  Topic,
  TopicBody,
  TopicHeader,
  TopicOne,
  TopicSubTitle,
  TopicTitle,
  TopicsContainer,
} from "./styles";

const Home = () => {
  return (
    <div>
      <PaddingContainer>
        <div style={{ display: "flex", width: "100%" }}>
          <MainTextContainer>
            <MainTextHeader>
              O Barroco{" "}
              <span
                style={{ color: "#588157", borderBottom: "2px solid #ded" }}
              >
                Reinventado
              </span>
            </MainTextHeader>
            <MainText>
              Bem-vindo ao nosso site! Aqui você pode encontrar informações
              sobre igrejas, pinturas e artistas do período barroco brasileiro.
              O barroco foi um período de grande efervescência artística no
              Brasil, com a chegada dos colonizadores portugueses e a influência
              da igreja católica.
            </MainText>
          </MainTextContainer>
          <div
            style={{
              width: "30%",
              paddingTop: "3rem",
            }}
          >
            <ImageCarousel2
              images={[temp, temp2, temp3, temp4, temp5, temp6]}
            />
          </div>
        </div>
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
          <TopicOne>
            <TopicHeader>
              <TopicTitle>Obras</TopicTitle>
              <TopicSubTitle>
                Procure por pinturas do período barroco brasileiro
              </TopicSubTitle>
            </TopicHeader>
            <HomeTopic type={"paintings"} data={brazilianPaintings} />
          </TopicOne>
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
