import React from "react";
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
  const isLoggedin = localStorage.getItem("user");

  return (
    <HeaderContainer>
      <Col1>
        <TitleContainer onClick={() => navigate("/")}>
          <img src={PaintBucket} alt="Museu Barroco" />
          <Title>Museu Barroco</Title>
        </TitleContainer>

        <ButtonsContainer>
          <HeaderButton onClick={() => navigate("/pesquisa/obras")}>
            Galeria de Obras
          </HeaderButton>
          <HeaderButton onClick={() => navigate("/pesquisa/igrejas")}>
            Igrejas
          </HeaderButton>
          <HeaderButton onClick={() => navigate("/pesquisa/topicos")}>
            Tópicos
          </HeaderButton>
          <HeaderButton onClick={() => navigate("/sobre")}>Sobre</HeaderButton>
        </ButtonsContainer>
      </Col1>

      <Col2>
        {isLoggedin ? (
          <LoginButton onClick={() => navigate("/admin")}>
            Dashboard
          </LoginButton>
        ) : (
          <LoginButton onClick={() => navigate("/login")}>Log In</LoginButton>
        )}

        {isLoggedin ? (
          <ContribButton onClick={() => navigate("/submit")}>
            Nova Obra
          </ContribButton>
        ) : (
          <ContribButton onClick={() => navigate("/register")}>
            Faça parte
          </ContribButton>
        )}
      </Col2>
    </HeaderContainer>
  );
};
export default Header;
