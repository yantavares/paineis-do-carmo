import React from "react";
import { Tag, TagsContainer } from "./styles";

interface TagsProps {
  tags: string[] | undefined;
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <TagsContainer>
      {tags && tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
    </TagsContainer>
  );
};

export default Tags;
