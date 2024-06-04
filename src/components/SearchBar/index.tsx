import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import magGlass from "src/assets/mag-glass.svg";
import colors from "src/utils/colors";
import {
  Container,
  HomeInput,
  InputContainer,
  SearchOption,
  SearchOptionContainer,
  StyledIcon,
  SvgIcon,
} from "./styles";

const SearchBar = ({ placeHolder = "", showButtons = true }) => {
  const [inputValue, setInputValue] = useState("");
  const [option, setOption] = useState("paintings");

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
        <StyledIcon size="3x" color={colors.lightGray} icon={faArrowRight} />
      </InputContainer>
      {showButtons && (
        <SearchOptionContainer>
          <SearchOption
            selected={option === "paintings"}
            onClick={() => setOption("paintings")}
          >
            Obras
          </SearchOption>
          <SearchOption
            selected={option === "churches"}
            onClick={() => setOption("churches")}
          >
            Igrejas
          </SearchOption>
          <SearchOption
            selected={option === "artists"}
            onClick={() => setOption("artists")}
          >
            Artífices
          </SearchOption>
        </SearchOptionContainer>
      )}
    </Container>
  );
};
export default SearchBar;
