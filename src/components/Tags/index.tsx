import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, TagsContainer } from "./styles";

interface TagsProps {
  tags: string[] | undefined;
  tagCount: number | undefined;
}

const Tags = ({ tags, tagCount }: TagsProps) => {
  const navigate = useNavigate();
  return (
    <TagsContainer>
      {tags &&
        tags.map((tag, index) => {
          if (tagCount && tagCount !== -1 && index >= tagCount) return;
          return (
            <Tag onClick={() => navigate(`/topicos/${tag}`)} key={index}>
              {tag}
            </Tag>
          );
        })}
    </TagsContainer>
  );
};

export default Tags;
