import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import temp4 from "src/assets/utils/baroque.jpg";
import temp2 from "src/assets/utils/baroque2.jpg";
import temp from "src/assets/utils/baroque3.jpg";
import temp6 from "src/assets/utils/igreja2.jpg";
import ImageCarousel2 from "src/components/ImageCarousel2";
import igreja1 from "src/assets/churches/igreja1.jpeg";
import igreja2 from "src/assets/churches/igreja2.jpeg";
import igreja3 from "src/assets/churches/igreja3.jpeg";
import igreja4 from "src/assets/churches/igreja4.jpeg";
import igreja5 from "src/assets/churches/igreja5.jpeg";
import HomeSearch from "src/components/SearchBar";
import colors from "src/utils/colors";
import HomeTopic from "./HomeTopic";
import HomeTopicMobile from "./HomeTopicMobile";
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
import {
  GreetingContainerMobile,
  MainTextContainerMobile,
  MainTextHeaderMobile,
  MainTextMobile,
  PaddingContainerMobile,
  TopicBodyMobile,
  TopicHeaderMobile,
  TopicMobile,
  TopicOneMobile,
  TopicSubTitleMobile,
  TopicTitleMobile,
  TopicsContainerMobile,
} from "./stylesMobile";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 860);
  const [dataPaintings, setDataPaintings] = useState<any[]>([]);
  const [dataChurches, setDataChurches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [paintingsResponse, churchesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/paintings`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/churches`)
        ]);
        setDataPaintings(paintingsResponse.data);
        setDataChurches(churchesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectItemsByFibonacci = (items: any[]) => {
    const fibonacci = [1, 2, 3, 5];
    const selectedItems: any[] = [];
    const totalItems = items.length;

    fibonacci.forEach(fibNum => {
      const index = totalItems - fibNum;
      if (index >= 0 && index < totalItems) {
        selectedItems.push(items[index]);
      }
    });

    return selectedItems;
  };

  const getImagesFromItems = (items: any[], fibonacciSequence: number[]) => {
    const images: string[] = [];
    const totalItems = items.length;

    fibonacciSequence.forEach(fibNum => {
      const index = totalItems - fibNum;
      if (index >= 0 && index < totalItems) {
        const item = items[index];
        if (item.images && item.images.length > 0) {
          images.push(item.images[0].url);
        }
      }
    });

    return images;
  };

  const selectedPaintings = useMemo(() => selectItemsByFibonacci(dataPaintings), [dataPaintings]);
  const selectedChurches = useMemo(() => selectItemsByFibonacci(dataChurches), [dataChurches]);
  
  const carouselPaintingImages = useMemo(() => getImagesFromItems(dataPaintings, [8, 13, 21, 34]), [dataPaintings]);
  const carouselChurchImages = useMemo(() => getImagesFromItems(dataChurches, [8, 13, 21, 34]), [dataChurches]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div>
        <PaddingContainerMobile>
          <GreetingContainerMobile>
            <MainTextContainerMobile>
              <MainTextHeaderMobile>
                O Museu{" "}
                <span
                  style={{
                    color: colors.mainColor,
                    borderBottom: "2px solid #eedddd",
                  }}
                >
                  Barroco
                </span>
              </MainTextHeaderMobile>
              <div style={{}}>
                <ImageCarousel2 
                  images={carouselPaintingImages.length > 0 ? carouselPaintingImages : [temp, temp2, temp4, temp6]} 
                />
              </div>
              <MainTextMobile>
                Na América portuguesa, a arte dita barroca tem seu auge no
                século XVIII relegando um patrimônio histórico sacro de inegável
                importância para a nossa contemporaneidade. Apesar de termos
                trabalhos acadêmicos de qualidade voltados para a produção desta
                manifestação artística, não havia nenhum trabalho de História
                Pública que buscasse unir a divulgação deste vasto acervo com as
                suas bases iconográficas. Através da bolsa produtividade do
                CNPQ, junto com o apoio da Universidade de Brasília em seu
                programa de Iniciação Científica, foi possível desenvolver o
                presente site o qual será constantemente alimentado com novos
                acervos. Mais do que um projeto pessoal, o Museu barroco almeja
                ser um espaço colaborativo onde pesquisadores poderão contribuir
                com a suas pesquisas por meio de ferramenta de interação.
              </MainTextMobile>
            </MainTextContainerMobile>
          </GreetingContainerMobile>
          <HomeSearch
            inputValue={inputValue}
            setInputValue={setInputValue}
            placeHolder={"Descubra o barroco"}
          />
        </PaddingContainerMobile>
        {/* <CarouselContainer>
      <ImageCarousel images={[temp, temp2, temp3, temp4, temp5, temp6]} />
    </CarouselContainer> */}
        <PaddingContainerMobile>
          <TopicsContainerMobile>
            <TopicMobile>
              <TopicHeaderMobile>
                <TopicTitleMobile>Como utilizar</TopicTitleMobile>
                <TopicSubTitleMobile>
                  Formas que você pode usufruir do nosso site
                </TopicSubTitleMobile>
              </TopicHeaderMobile>
              <TopicBodyMobile>
                <RoundBox
                  videoURL={"FMgvlhz8Ryc"}
                  text={"Apresentação do projeto"}
                  buttonText={"Sobre nós"}
                  color={colors.darkMain}
                />
                <RoundBox
                  videoURL={"SOXdIAh9pQs"}
                  text={"Como navegar pelo site"}
                  buttonText={"Como utilizar"}
                  color={colors.mainColor}
                />
                <RoundBox
                  videoURL={"DId_2vG8S0g"}
                  text={"Faça parte do projeto!"}
                  buttonText={"Fazer parte"}
                  color={colors.lightMain}
                />
              </TopicBodyMobile>
            </TopicMobile>
            <TopicOneMobile>
              <TopicHeaderMobile>
                <TopicTitleMobile>Obras</TopicTitleMobile>
                <TopicSubTitleMobile>
                  Procure por pinturas do período barroco brasileiro
                </TopicSubTitleMobile>
              </TopicHeaderMobile>
              <HomeTopicMobile
                type={"paintings"}
                data={selectedPaintings}
              />
            </TopicOneMobile>
            <TopicMobile>
              <TopicHeaderMobile>
                <TopicTitleMobile>Igrejas</TopicTitleMobile>
                <TopicSubTitleMobile>
                  Procure por igrejas do período barroco brasileiro
                </TopicSubTitleMobile>
              </TopicHeaderMobile>
              <HomeTopicMobile type={"churches"} data={selectedChurches} />
            </TopicMobile>
          </TopicsContainerMobile>
        </PaddingContainerMobile>
      </div>
    );
  }

  return (
    <div>
      <PaddingContainer>
        <GreetingContainer>
          <MainTextContainer>
            <MainTextHeader>
              O Museu{" "}
              <span
                style={{
                  color: colors.mainColor,
                  borderBottom: "2px solid #eedddd",
                }}
              >
                Barroco
              </span>
            </MainTextHeader>
            <MainText>
              Na América portuguesa, a arte dita barroca tem seu auge no século
              XVIII relegando um patrimônio histórico sacro de inegável
              importância para a nossa contemporaneidade. Apesar de termos
              trabalhos acadêmicos de qualidade voltados para a produção desta
              manifestação artística, não havia nenhum trabalho de História
              Pública que buscasse unir a divulgação deste vasto acervo com as
              suas bases iconográficas. Através da bolsa produtividade do CNPQ,
              junto com o apoio da Universidade de Brasília em seu programa de
              Iniciação Científica, foi possível desenvolver o presente site o
              qual será constantemente alimentado com novos acervos. Mais do que
              um projeto pessoal, o Museu barroco almeja ser um espaço
              colaborativo onde pesquisadores poderão contribuir com a suas
              pesquisas por meio de ferramenta de interação.
            </MainText>
          </MainTextContainer>
          <div
            style={{
              width: "30%",
              paddingTop: "3rem",
            }}
          >
            <ImageCarousel2
              images={carouselChurchImages.length > 0 ? carouselChurchImages : [igreja1, igreja2, igreja3, igreja4, igreja5]}
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
                videoURL={"FMgvlhz8Ryc"}
                text={"Apresentação do projeto"}
                buttonText={"Sobre nós"}
                color={colors.darkMain}
              />
              <RoundBox
                videoURL={"SOXdIAh9pQs"}
                text={"Como navegar pelo site"}
                buttonText={"Como utilizar"}
                color={colors.mainColor}
              />
              <RoundBox
                videoURL={"DId_2vG8S0g"}
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
            <HomeTopic type={"paintings"} data={selectedPaintings} />
          </TopicOne>
          <Topic>
            <TopicHeader>
              <TopicTitle>Igrejas</TopicTitle>
              <TopicSubTitle>
                Procure por igrejas do período barroco brasileiro
              </TopicSubTitle>
            </TopicHeader>
            <HomeTopic type={"churches"} data={selectedChurches} />
          </Topic>
        </TopicsContainer>
      </PaddingContainer>
    </div>
  );
};
export default Home;
