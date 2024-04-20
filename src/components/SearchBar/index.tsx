import React, { useState } from "react";
import {
  Container,
  HomeInput,
  InputContainer,
  SearchOption,
  SearchOptionContainer,
  SvgIcon,
} from "./styles";
import magGlass from "src/assets/mag-glass.svg";

// TODO add button logic

const SearchBar = ({ placeHolder = "", showButtons = true }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Container>
      <InputContainer>
        <SvgIcon src={magGlass} alt="Search" />
        <HomeInput
          type="text"
          name="search"
          placeholder={placeHolder}
          value={inputValue}
          onChange={handleInputChange}
        />
      </InputContainer>
      {showButtons && (
        <SearchOptionContainer>
          <SearchOption>Obras</SearchOption>
          <SearchOption>Igrejas</SearchOption>
          <SearchOption>Artífices</SearchOption>
        </SearchOptionContainer>
      )}
    </Container>
  );
};
export default SearchBar;
