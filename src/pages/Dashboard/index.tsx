import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DataTable from "src/components/DataTable";
import {
  Button,
  ButtonContainer,
  Container,
  Header,
  HeaderContainer,
  MainButton,
  SmallText,
} from "./styles";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderContainer>
        <Header href="/">Museu Barroco</Header>
        <ButtonContainer>
          <a href="/paineis-do-carmo/submit">
            <MainButton>Nova Obra</MainButton>
          </a>
          <Button>
            <FontAwesomeIcon icon={faGear} />
          </Button>
          <Button>
            <FontAwesomeIcon icon={faUser} />
          </Button>
        </ButtonContainer>
      </HeaderContainer>
      <div>
        <SmallText>REQUISIÇÔES RECENTES</SmallText>
        <DataTable />
      </div>
    </Container>
  );
};

export default index;
