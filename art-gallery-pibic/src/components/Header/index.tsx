import React from "react";
import PaintBucket from "src/assets/paint-bucket.svg";
import {
  ButtonsContainer,
  Col1,
  Col2,
  ContribButton,
  HeaderButton,
  HomeHeader,
  LoginButton,
  Title,
  TitleContainer,
} from "./styles";

const Header = () => {
  return (
    <HomeHeader>
      <Col1>
        <TitleContainer>
          <img src={PaintBucket} alt="Museu Barroco" />
          <Title>Museu Barroco</Title>
        </TitleContainer>
        <ButtonsContainer>
          <HeaderButton>Igrejas</HeaderButton>
          <HeaderButton>Galeria de Obras</HeaderButton>
          <HeaderButton>Artistas</HeaderButton>
          <HeaderButton>Sobre</HeaderButton>
        </ButtonsContainer>
      </Col1>

      <Col2>
        <LoginButton>Log In</LoginButton>
        <ContribButton>Fazer Parte</ContribButton>
      </Col2>
    </HomeHeader>
  );
};
export default Header;
