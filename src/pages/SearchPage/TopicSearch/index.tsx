import React, { useState, useEffect } from "react";
import SearchBar from "src/components/SearchBar";
import { Tag } from "src/utils/mockData";
import { SearchHeader, SearchBarContainer } from "../styles";
import colors from "src/utils/colors";
import { BigTag, BigTagMobile } from "./styles";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { SearchHeaderMobile } from "../stylesMobile";

interface TopicSearchProps {
  tags: Tag[];
  isLoading: boolean;
  isMobile: boolean;
}

const TopicSearch = ({ tags, isLoading, isMobile }: TopicSearchProps) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState(tags);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  useEffect(() => {
    let noDataTimeout;
    const handleFilter = () => {
      const filtered = tags.filter((tag) =>
        tag.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredTags(filtered);

      noDataTimeout = setTimeout(() => {
        setShowNoDataMessage(filtered.length === 0);
      }, 200);
    };

    handleFilter();

    return () => clearTimeout(noDataTimeout);
  }, [inputValue, tags]);

  if (isMobile) {
    return (
      <>
        <SearchHeaderMobile>
          Nossos <span style={{ color: colors.mainColor }}>Tópicos</span>
          <SearchBarContainer>
            <div style={{ width: "100%" }}>
              <SearchBar
                inputValue={inputValue}
                setInputValue={setInputValue}
                placeHolder={"Busque por Tópico"}
                showButtons={false}
              />
            </div>
          </SearchBarContainer>
        </SearchHeaderMobile>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {isLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress style={{ color: colors.mainColor }} />
            </div>
          ) : filteredTags && filteredTags.length > 0 ? (
            filteredTags.map((tag, index) => (
              <BigTagMobile
                onClick={() =>
                  navigate(`/topicos/${tag.name.toLocaleLowerCase()}`)
                }
                key={index}
              >
                {tag.name}
              </BigTagMobile>
            ))
          ) : (
            showNoDataMessage && <p>Nenhum tópico encontrado...</p>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <SearchHeader>
        Nossos <span style={{ color: colors.mainColor }}>Tópicos</span>
        <SearchBarContainer>
          <div style={{ width: "100%" }}>
            <SearchBar
              inputValue={inputValue}
              setInputValue={setInputValue}
              placeHolder={"Busque por Tópico"}
              showButtons={false}
            />
          </div>
        </SearchBarContainer>
      </SearchHeader>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          gap: "4rem 2rem",
        }}
      >
        {isLoading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress style={{ color: colors.mainColor }} />
          </div>
        ) : filteredTags && filteredTags.length > 0 ? (
          filteredTags.map((tag, index) => (
            <BigTag
              onClick={() =>
                navigate(`/topicos/${tag.name.toLocaleLowerCase()}`)
              }
              key={index}
            >
              {tag.name}
            </BigTag>
          ))
        ) : (
          showNoDataMessage && <p>Nenhum tópico encontrado...</p>
        )}
      </div>
    </>
  );
};

export default TopicSearch;
