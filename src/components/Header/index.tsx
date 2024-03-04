import React from "react";
import PaintBucket from "src/assets/paint-bucket.svg";
import {
  ButtonsContainer,
  Col1,
  Col2,
  ContribButton,
  HeaderButton,
  HeaderContainer,
  LoginButton,
  Title,
  TitleContainer,
} from "./styles";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <Col1>
        <TitleContainer onClick={() => navigate("/")}>
          <img src={PaintBucket} alt="Museu Barroco" />
          <Title>Museu Barroco</Title>
        </TitleContainer>

        <ButtonsContainer>
          <HeaderButton>Galeria de Obras</HeaderButton>
          <HeaderButton>Igrejas</HeaderButton>
          <HeaderButton>Artistas</HeaderButton>
          <HeaderButton>Sobre</HeaderButton>
        </ButtonsContainer>
      </Col1>

      <Col2>
        <LoginButton onClick={() => navigate("/login")}>Log In</LoginButton>
        <ContribButton>Fazer Parte</ContribButton>
      </Col2>
    </HeaderContainer>
  );
};
export default Header;
