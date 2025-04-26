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
import { CircularProgress } from "@mui/material";
import {
  SearchContainerMobile,
  SearchHeaderMobile,
  SearchResultMobile,
} from "./stylesMobile";

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

  const [dataChurch, setDataChurch] = useState([]);
  const [dataPainting, setDataPainting] = useState([]);
  const [dataTopics, setDataTopics] = useState([]);

  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState(query ? query : "");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 860);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const translatedSelected = useMemo(
    () => translateSelected(selected),
    [selected]
  );

  useEffect(() => {
    setInputValue(query ? query : "");
  }, [selected]);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      if (translatedSelected === "churches" && dataChurch.length === 0)
        setIsLoading(true);
      if (translatedSelected === "paintings" && dataPainting.length === 0)
        setIsLoading(true);
      if (translatedSelected === "tags" && dataTopics.length === 0)
        setIsLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/${translatedSelected}`
        );

        if (translatedSelected === "churches") setDataChurch(response.data);
        if (translatedSelected === "paintings") setDataPainting(response.data);
        if (translatedSelected === "tags") setDataTopics(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (translatedSelected !== "wrong") {
      fetchData();
    }
  }, [translatedSelected]);

  const filteredDataPainting = dataPainting?.filter((item) => {
    return (
      item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  });

  const filteredDataChurch = dataChurch?.filter((item) => {
    return item.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  const filteredDataTopics = dataTopics?.filter((item) => {
    return item.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  if (isLoading) {
  }

  const renderContentMobile = () => {
    switch (selected) {
      case "obras":
        return (
          <>
            <SearchHeaderMobile>
              Nossa Coleção de{" "}
              <span style={{ color: colors.mainColor }}>
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
            </SearchHeaderMobile>

            <SearchResultsContainer>
              {/* Display loading spinner */}
              {isLoading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <CircularProgress style={{ color: colors.mainColor }} />
                </div>
              ) : filteredDataPainting?.length > 0 ? (
                filteredDataPainting.map((item) => (
                  <SearchResultMobile key={item?.id}>
                    <Item
                      item={item}
                      type={translateTopicType(selected)}
                      fixedImgHeight
                    />
                  </SearchResultMobile>
                ))
              ) : (
                error && <p>Nenhum item encontrado na busca...</p>
              )}
            </SearchResultsContainer>
          </>
        );

      case "igrejas":
        return (
          <>
            <ChurchMap isMobile={isMobile} />
            <SearchHeaderMobile>
              Todas as{" "}
              <span style={{ color: colors.mainColor }}>
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
            </SearchHeaderMobile>
            <SearchResultsContainer>
              {isLoading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <CircularProgress style={{ color: colors.mainColor }} />
                </div>
              ) : filteredDataChurch?.length > 0 ? (
                filteredDataChurch.map((item, index) => (
                  <SearchResultMobile key={index}>
                    <Item
                      item={item}
                      type={translateTopicType(selected)}
                      fixedImgHeight
                    />
                  </SearchResultMobile>
                ))
              ) : (
                error && <p>Nenhum item encontrado na busca...</p>
              )}
            </SearchResultsContainer>
          </>
        );

      case "topicos":
        return (
          <TopicSearch
            isLoading={isLoading}
            tags={filteredDataTopics}
            isMobile={isMobile}
          />
        );

      default:
        return <p>Selecione uma categoria válida.</p>;
    }
  };

  const renderContent = () => {
    switch (selected) {
      case "artifices":
      case "obras":
        return (
          <>
            <SearchHeader>
              Nossa Coleção de{" "}
              <span style={{ color: colors.mainColor }}>
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
              {/* Display loading spinner */}
              {isLoading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <CircularProgress style={{ color: colors.mainColor }} />
                </div>
              ) : filteredDataPainting?.length > 0 ? (
                filteredDataPainting.map((item) => (
                  <SearchResult key={item?.id}>
                    <Item
                      item={item}
                      type={translateTopicType(selected)}
                      fixedImgHeight
                    />
                  </SearchResult>
                ))
              ) : (
                error && <p>Nenhum item encontrado na busca...</p>
              )}
            </SearchResultsContainer>
          </>
        );

      case "igrejas":
        return (
          <>
            <ChurchMap isMobile={isMobile} />
            <SearchHeader>
              Todas as{" "}
              <span style={{ color: colors.mainColor }}>
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
              {isLoading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <CircularProgress style={{ color: colors.mainColor }} />
                </div>
              ) : filteredDataChurch?.length > 0 ? (
                filteredDataChurch.map((item, index) => (
                  <SearchResult key={index}>
                    <Item
                      item={item}
                      type={translateTopicType(selected)}
                      fixedImgHeight
                    />
                  </SearchResult>
                ))
              ) : (
                error && <p>Nenhum item encontrado na busca...</p>
              )}
            </SearchResultsContainer>
          </>
        );

      case "topicos":
        return (
          <TopicSearch
            isLoading={isLoading}
            tags={filteredDataTopics}
            isMobile={isMobile}
          />
        );

      default:
        return <p>Selecione uma categoria válida.</p>;
    }
  };

  if (isMobile)
    return (
      <SearchContainerMobile>{renderContentMobile()}</SearchContainerMobile>
    );
  else return <SearchContainer>{renderContent()}</SearchContainer>;
};

export default SearchPage;
