import React from "react";
import { SearchHeader } from "./styles";
import { useParams } from "react-router-dom";
import { capitalize } from "src/utils/strings";
import colors from "src/utils/colors";
import SearchBar from "src/components/SearchBar";

const SearchPage = () => {
  const { selected } = useParams();
  return (
    <div style={{ padding: "2% 5%" }}>
      <SearchHeader>
        Nossa Coleção de{" "}
        <span style={{ color: colors.green }}>{capitalize(selected)}</span>
        <SearchBar placeHolder={`Busque por ${selected}`} showButtons={false} />
      </SearchHeader>
    </div>
  );
};
export default SearchPage;
