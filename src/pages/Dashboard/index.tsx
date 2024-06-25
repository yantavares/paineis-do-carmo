import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DataTable from "src/components/DataTable";
import axios from "axios";
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formatedData, setFormatedData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/paintings`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    data.forEach((painting) => {
      setFormatedData((prev) => [
        ...prev,
        {
          id: painting?.id,
          name: painting?.title,
          status: painting?.status ?? "Aprovada",
          user: painting?.registeredBy ?? "Desconhecido",
          date: "Desconhecido",
        },
      ]);
    });
  }, [data]);

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
        <DataTable data={formatedData} />
      </div>
    </Container>
  );
};

export default index;
