import React, { useState } from "react";
import { Container, HomeInput, InputContainer, SvgIcon } from "./styles";
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
    </Container>
  );
};
export default HomeSearch;
