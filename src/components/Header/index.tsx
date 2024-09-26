import React from "react";
import { useNavigate } from "react-router-dom";
import LogoMain from "src/assets/utils/logo.svg";
import {
  ButtonsContainer,
  Col1,
  Col2,
  ContribButton,
  HeaderButton,
  HeaderContainer,
  Icon,
  LoginButton,
  Title,
  TitleContainer,
} from "./styles";
import { jwtDecode } from "jwt-decode";

const isLoggedIn = (token: string) => {
  if (token && token !== "admin") {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      alert("Sessão expirada. Por favor, faça login novamente.");
      return false;
    }
    return true;
  }
  if (token === "admin") {
    localStorage.removeItem("token");
    alert("Sessão expirada. Por favor, faça login novamente.");
  }
  return false;
};

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isLoggedin = isLoggedIn(token);

  return (
    <HeaderContainer>
      <Col1>
        <TitleContainer onClick={() => navigate("/")}>
          <Icon src={LogoMain} alt="Museu Barroco" />
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
          <LoginButton onClick={() => navigate("/dashboard")}>
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
