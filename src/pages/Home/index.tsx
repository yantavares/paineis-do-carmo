import React, { useState } from "react";
import temp3 from "src/assets/utils/artista1.jpg";
import temp4 from "src/assets/utils/baroque.jpg";
import temp2 from "src/assets/utils/baroque2.jpg";
import temp from "src/assets/utils/baroque3.jpg";
import temp6 from "src/assets/utils/igreja2.jpg";
import temp5 from "src/assets/utils/pintura2.jpg";
import ImageCarousel2 from "src/components/ImageCarousel2";
import HomeSearch from "src/components/SearchBar";
import colors from "src/utils/colors";
import { brazilianChurches, brazilianPaintings } from "../../utils/mockData";
import HomeTopic from "./HomeTopic";
import RoundBox from "./RoundBox";
import {
  GreetingContainer,
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
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <PaddingContainer>
        <GreetingContainer>
          <MainTextContainer>
            <MainTextHeader>
              O Barroco{" "}
              <span
                style={{
                  color: colors.mainColor,
                  borderBottom: "2px solid #eedddd",
                }}
              >
                Reinventado
              </span>
            </MainTextHeader>
            <MainText>
              Bem-vindo ao nosso site! Aqui você pode encontrar informações
              sobre igrejas, pinturas e artifices do período barroco brasileiro.
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
        </GreetingContainer>
        <HomeSearch
          inputValue={inputValue}
          setInputValue={setInputValue}
          placeHolder={"Busque por imagens, tópicos, pintores, igrejas..."}
        />
      </PaddingContainer>
      {/* <CarouselContainer>
        <ImageCarousel images={[temp, temp2, temp3, temp4, temp5, temp6]} />
      </CarouselContainer> */}
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
                text={"Apresentação do projeto"}
                buttonText={"Sobre nós"}
                color={colors.darkMain}
              />
              <RoundBox
                text={"Como navegar pelo site"}
                buttonText={"Como utilizar"}
                color={colors.mainColor}
              />
              <RoundBox
                text={"Faça parte do projeto!"}
                buttonText={"Fazer parte"}
                color={colors.lightMain}
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
        </TopicsContainer>
      </PaddingContainer>
    </div>
  );
};
export default Home;
