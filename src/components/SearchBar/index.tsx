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
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  placeHolder = "",
  showButtons = true,
  inputValue = "",
  setInputValue = null,
  mode = "obras",
}) => {
  const [option, setOption] = useState(mode);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Container>
      <InputContainer>
        <SvgIcon src={magGlass} alt="Search" />
        <form
          style={{ width: "100%" }}
          onSubmit={() => navigate(`/pesquisa/${option}?search=${inputValue}`)}
        >
          <HomeInput
            type="text"
            name="search"
            placeholder={placeHolder}
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
        <StyledIcon
          onClick={() => navigate(`/pesquisa/${option}?search=${inputValue}`)}
          size="3x"
          color={colors.lightGray}
          icon={faArrowRight}
        />
      </InputContainer>
      {showButtons && (
        <SearchOptionContainer>
          <SearchOption
            selected={option === "obras"}
            onClick={() => setOption("obras")}
          >
            Obras
          </SearchOption>
          <SearchOption
            selected={option === "igrejas"}
            onClick={() => setOption("igrejas")}
          >
            Igrejas
          </SearchOption>
        </SearchOptionContainer>
      )}
    </Container>
  );
};
export default SearchBar;
