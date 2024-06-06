import React from "react";
import SearchBar from "src/components/SearchBar";
import { Tag, tags } from "src/utils/mockData";
import { SearchHeader, SearchBarContainer } from "../styles";
import colors from "src/utils/colors";
import { BigTag } from "./styles";
import { useNavigate } from "react-router-dom";

interface TopicSearchProps {
  tags: Tag[];
}

const TopicSearch = ({ tags }: TopicSearchProps) => {
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
        {tags.map((tag, index) => (
          <BigTag onClick={() => navigate(`/topicos/${tag.name}`)} key={index}>
            {tag.name}
          </BigTag>
        ))}
      </div>
    </>
  );
};

export default TopicSearch;
