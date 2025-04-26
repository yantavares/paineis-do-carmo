import { jwtDecode } from "jwt-decode";
import { Menu, X } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import {
  Col1Mobile,
  Drawer,
  HeaderContainerMobile,
  MenuButton,
  Overlay,
} from "./stylesMobile";

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

const Header: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedin = isLoggedIn(token);

  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((p) => !p);
  const close = () => setOpen(false);

  const location = useLocation();

  React.useEffect(() => {
    close();
  }, [location]);

  if (isMobile) {
    return (
      <>
        <HeaderContainerMobile>
          <Col1Mobile>
            <TitleContainer
              onClick={() => {
                navigate("/");
                close();
              }}
            >
              <Icon src={LogoMain} alt="Museu Barroco" />
              <Title>Museu Barroco</Title>
            </TitleContainer>
          </Col1Mobile>

          <MenuButton
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={toggle}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </MenuButton>
        </HeaderContainerMobile>

        <Overlay open={open} onClick={close} />

        <Drawer open={open} aria-hidden={!open}>
          <button
            onClick={() => {
              navigate("/pesquisa/obras");
              close();
            }}
          >
            Galeria de Obras
          </button>
          <button
            onClick={() => {
              navigate("/pesquisa/igrejas");
              close();
            }}
          >
            Igrejas
          </button>
          <button
            onClick={() => {
              navigate("/pesquisa/topicos");
              close();
            }}
          >
            Tópicos
          </button>
          <button
            onClick={() => {
              navigate("/sobre");
              close();
            }}
          >
            Sobre
          </button>

          <hr />

          {isLoggedin ? (
            <>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  close();
                }}
              >
                Dashboard
              </button>
              {/* <button
                onClick={() => {
                  navigate("/submit");
                  close();
                }}
              >
                Nova Obra
              </button> */}
            </>
          ) : (
            <>
              <LoginButton
                onClick={() => {
                  navigate("/login");
                  close();
                }}
              >
                Log In
              </LoginButton>
              <ContribButton
                onClick={() => {
                  navigate("/register");
                  close();
                }}
              >
                Faça parte
              </ContribButton>
            </>
          )}
        </Drawer>
      </>
    );
  }
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
