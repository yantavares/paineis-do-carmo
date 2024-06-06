import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "src/components/Item";
import SearchBar from "src/components/SearchBar";
import colors from "src/utils/colors";
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

const translateSelected = (selected: string) => {
  switch (selected) {
    case "artifices":
      return "artisans";
    case "obras":
      return "paintings";
    case "igrejas":
      return "churches";
    case "topicos":
      return "topics";
    default:
      return "wrong";
  }
};

const SearchPage = () => {
  const { selected } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/${translateSelected(selected)}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPaintings();
  }, [selected]);

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
              {data.map((item: any) => {
                return (
                  <SearchResult key={item?.id}>
                    <Item
                      item={item}
                      type={translateTopicType(selected)}
                      fixedImgHeight
                    />
                  </SearchResult>
                );
              })}
            </SearchResultsContainer>
          </>
        );

      case "igrejas":
        return (
          <>
            <ChurchMap />
            <SearchHeader>
              Todas as{" "}
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

      case "topicos":
        return <TopicSearch />;

      default:
        return <p>Selecione uma categoria válida.</p>;
    }
  };

  return <SearchContainer>{renderContent()}</SearchContainer>;
};

export default SearchPage;
