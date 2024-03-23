import React from "react";
import { SearchHeader } from "./styles";
import { useParams } from "react-router-dom";
import { capitalize } from "src/utils/strings";

const SearchPage = () => {
  const { selected } = useParams();
  return (
    <div style={{ padding: "2% 5%" }}>
      <SearchHeader>
        Nossa Coleção de{" "}
        <span style={{ color: "#588157" }}>{capitalize(selected)}</span>
      </SearchHeader>
    </div>
  );
};
export default SearchPage;
