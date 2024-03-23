import React from "react";
import { SearchHeader } from "./styles";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { selected } = useParams();
  console.log(selected);
  return (
    <div style={{ padding: "2% 5%" }}>
      <SearchHeader>Nossa coleção</SearchHeader>
    </div>
  );
};
export default SearchPage;
