import React from "react";
import { SearchHeader } from "./styles";
import { useParams } from "react-router-dom";
import { capitalize } from "src/utils/strings";
import colors from "src/utils/colors";

const SearchPage = () => {
  const { selected } = useParams();
  return (
    <div style={{ padding: "2% 5%" }}>
      <SearchHeader>
        Nossa Coleção de{" "}
        <span style={{ color: colors.green }}>{capitalize(selected)}</span>
      </SearchHeader>
    </div>
  );
};
export default SearchPage;
