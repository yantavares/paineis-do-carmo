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

const SearchBar = () => {
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
          placeholder="Busque por imagens, tópicos, pintores, igrejas..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </InputContainer>
      <SearchOptionContainer>
        <SearchOption>Obras</SearchOption>
        <SearchOption>Igrejas</SearchOption>
        <SearchOption>Artistas</SearchOption>
      </SearchOptionContainer>
    </Container>
  );
};
export default SearchBar;
