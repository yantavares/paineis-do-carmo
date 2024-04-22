import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "src/components/Item";
import SearchBar from "src/components/SearchBar";
import colors from "src/utils/colors";
import {
  Artist,
  Church,
  Painting,
  Tag,
  brazilianArtists,
  brazilianChurches,
  brazilianPaintings,
  tags,
} from "src/utils/mockData";
import { capitalize, translateTopicType } from "src/utils/strings";
import ChurchMap from "./ChurchMap";
import TopicSearch from "./TopicSearch";
import {
  SearchBarContainer,
  SearchContainer,
  SearchHeader,
  SearchResult,
  SearchResultsContainer,
} from "./styles";

const SearchPage = () => {
  const navigate = useNavigate();
  const { selected } = useParams();

  const [data, setData] = useState<Church[] | Artist[] | Painting[] | Tag[]>(
    []
  );

  useEffect(() => {
    switch (selected) {
      case "artifices":
        setData(brazilianArtists.concat(brazilianArtists));
        break;
      case "igrejas":
        setData(brazilianChurches.concat(brazilianChurches));
        break;
      case "obras":
        setData(brazilianPaintings.concat(brazilianPaintings));
        break;

      case "topicos":
        setData(tags);
        break;
      default:
        setData([]);
        navigate("/pesquisa/obras");
        break;
    }
  }, [selected]);
  // Função para renderizar o conteúdo com base na seleção
  const renderContent = () => {
    switch (selected) {
      case "artifices":
      case "obras":
        return (
          <>
            <SearchHeader>
              Nossa Coleção de{" "}
              <span style={{ color: colors.green }}>
                {capitalize(selected)}
              </span>
              <SearchBarContainer>
                <SearchBar
                  placeHolder={`Busque por ${selected}`}
                  showButtons={false}
                />
              </SearchBarContainer>
            </SearchHeader>

            <SearchResultsContainer>
              {data.map((item: any, index: number) => (
                <SearchResult key={index}>
                  <Item
                    item={item}
                    type={translateTopicType(selected)}
                    fixedImgHeight
                  />
                </SearchResult>
              ))}
            </SearchResultsContainer>
          </>
        );

      case "igrejas":
        return <ChurchMap />;

      case "topicos":
        return <TopicSearch />;

      default:
        return <p>Selecione uma categoria válida.</p>;
    }
  };

  return <SearchContainer>{renderContent()}</SearchContainer>;
};

export default SearchPage;
