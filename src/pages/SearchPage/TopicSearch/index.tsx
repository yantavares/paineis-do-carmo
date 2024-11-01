import React, { useState, useEffect } from "react";
import SearchBar from "src/components/SearchBar";
import { Tag } from "src/utils/mockData";
import { SearchHeader, SearchBarContainer } from "../styles";
import colors from "src/utils/colors";
import { BigTag } from "./styles";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface TopicSearchProps {
  tags: Tag[];
  isLoading: boolean;
}

const TopicSearch = ({ tags, isLoading }: TopicSearchProps) => {
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

  return (
    <>
      <SearchHeader>
        Nossos <span style={{ color: colors.mainColor }}>Tópicos</span>
        <SearchBarContainer>
          <SearchBar
            inputValue={inputValue}
            setInputValue={setInputValue}
            placeHolder={"Busque por Tópico"}
            showButtons={false}
          />
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
