import React, { useEffect, useState } from "react";
import {
  SearchBarContainer,
  SearchContainer,
  SearchHeader,
  SearchResultsContainer,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize, translateTopicType } from "src/utils/strings";
import colors from "src/utils/colors";
import SearchBar from "src/components/SearchBar";
import Item from "src/components/Item";
import {
  Church,
  Artist,
  Painting,
  brazilianArtists,
  brazilianChurches,
  brazilianPaintings,
  tags,
  Tag,
} from "src/utils/mockData";
import ChurchMap from "./ChurchMap";
import TopicSearch from "./TopicSearch";

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
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{ height: "20rem", width: "calc(20% - 2.92rem)" }}
                >
                  <Item
                    item={item}
                    type={translateTopicType(selected)}
                    fixedImgHeight
                  />
                </div>
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
