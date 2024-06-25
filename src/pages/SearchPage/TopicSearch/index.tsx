import React from "react";
import SearchBar from "src/components/SearchBar";
import { Tag, tags } from "src/utils/mockData";
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

  return (
    <>
      <SearchHeader>
        Nossos <span style={{ color: colors.green }}>Tópicos</span>
        <SearchBarContainer>
          <SearchBar placeHolder={"Busque por Tópico"} showButtons={false} />
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
          <CircularProgress style={{ color: colors.green }} />
        ) : tags && tags.length > 0 ? (
          tags.map((tag, index) => (
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
          <p>Nenhum tópico encontrado...</p>
        )}
      </div>
    </>
  );
};

export default TopicSearch;
