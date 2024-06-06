import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, TagsContainer } from "./styles";
import { Tag as TagType } from "src/utils/mockData";

interface TagsProps {
  tags: TagType[] | undefined;
  tagCount?: number | undefined;
}

const Tags = ({ tags, tagCount = -1 }: TagsProps) => {
  const navigate = useNavigate();
  return (
    <TagsContainer>
      {tags &&
        tags.map((tag, index) => {
          if (tagCount && tagCount !== -1 && index >= tagCount) return;
          return (
            <Tag
              onClick={() =>
                navigate(`/topicos/${tag.name.toLocaleLowerCase()}`)
              }
              key={index}
            >
              {tag.name}
            </Tag>
          );
        })}
    </TagsContainer>
  );
};

export default Tags;
