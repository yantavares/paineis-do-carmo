import React from "react";
import { Tag, TagsContainer } from "./styles";
import { useNavigate } from "react-router-dom";

interface TagsProps {
  tags: string[] | undefined;
}

const Tags = ({ tags }: TagsProps) => {
  const navigate = useNavigate();
  return (
    <TagsContainer>
      {tags &&
        tags.map((tag, index) => (
          <Tag onClick={() => navigate(`/topicos/${tag}`)} key={index}>
            {tag}
          </Tag>
        ))}
    </TagsContainer>
  );
};

export default Tags;
