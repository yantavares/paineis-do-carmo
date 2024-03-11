import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Col1>
        <TitleContainer onClick={() => navigate("/paineis-do-carmo/")}>
          <img src={PaintBucket} alt="Museu Barroco" />
          <Title>Museu Barroco</Title>
        </TitleContainer>

        <ButtonsContainer>
          <HeaderButton>Galeria de Obras</HeaderButton>
          <HeaderButton>Igrejas</HeaderButton>
          <HeaderButton>Artistas</HeaderButton>
          <HeaderButton>Como utilizar</HeaderButton>
          <HeaderButton>Sobre</HeaderButton>
        </ButtonsContainer>
      </Col1>

      <Col2>
        <LoginButton onClick={() => navigate("/paineis-do-carmo/login")}>
          Log In
        </LoginButton>
        <ContribButton>Fazer Parte</ContribButton>
      </Col2>
    </HeaderContainer>
  );
};
export default Header;
