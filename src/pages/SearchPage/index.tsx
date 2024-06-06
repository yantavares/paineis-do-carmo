import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
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
      return "tags";
    default:
      return "wrong";
  }
};

const SearchPage = () => {
  const { selected } = useParams();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
      .toString()
      .replace("search=", "");
  };

  const query = useQuery();

  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState(query ? query : "");

  const translatedSelected = useMemo(
    () => translateSelected(selected),
    [selected]
  );

  useEffect(() => {
    setInputValue(query ? query : "");
  }, [selected]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/${translatedSelected}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (translatedSelected !== "wrong") {
      fetchData();
    }
  }, [translatedSelected]);

  const filteredData = data.filter((item) => {
    switch (selected) {
      case "obras":
        return item && item.title
          ? item.title.toLowerCase().includes(inputValue.toLowerCase())
          : false;
      default:
        return item && item.name
          ? item.name.toLowerCase().includes(inputValue.toLowerCase())
          : false;
    }
  });

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
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </SearchBarContainer>
            </SearchHeader>

            <SearchResultsContainer>
              {filteredData.map((item) => {
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
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </SearchBarContainer>
            </SearchHeader>
            <SearchResultsContainer>
              {filteredData.map((item, index) => (
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
        return <TopicSearch tags={filteredData} />;

      default:
        return <p>Selecione uma categoria válida.</p>;
    }
  };

  return <SearchContainer>{renderContent()}</SearchContainer>;
};

export default SearchPage;
