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
import PaintBucket from "src/assets/paint-bucket.svg";

const index = () => {
  return (
    <Container>
      <HeaderContainer>
        <div style={{ display: "flex", gap: "1rem" }}>
          <img src={PaintBucket} alt="icon" />
          <Header href="/">Museu Barroco</Header>
        </div>
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
