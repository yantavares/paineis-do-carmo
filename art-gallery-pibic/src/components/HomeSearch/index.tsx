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

const HomeSearch = () => {
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
export default HomeSearch;
