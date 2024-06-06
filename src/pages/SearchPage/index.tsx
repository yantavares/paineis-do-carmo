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
import axios from "axios";

const SearchPage = () => {
  const { selected } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/paintings`
        );
        console.log("Data fetched:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPaintings();
  }, []);

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
              {data.map((item: any, index: number) => {
                console.log("Item:", item.title);
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
