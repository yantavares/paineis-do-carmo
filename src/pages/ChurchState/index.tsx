import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "src/components/Item";
import SearchBar from "src/components/SearchBar";
import colors from "src/utils/colors";
import { Church, brazilianChurches } from "src/utils/mockData";
import { capitalize } from "src/utils/strings";
import {
  SearchBarContainer,
  SearchContainer,
  SearchHeader,
  SearchResult,
  SearchResultsContainer,
} from "../SearchPage/styles";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import {
  SearchContainerMobile,
  SearchHeaderMobile,
  SearchResultMobile,
  SearchResultsContainerMobile,
} from "../SearchPage/stylesMobile";

const ChurchState = () => {
  const { state } = useParams();
  const [data, setData] = useState<Church[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 860);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchPaintings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/churches?state=${state}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchPaintings();
  }, [state]);

  if (isMobile) {
    return (
      <SearchContainerMobile>
        <SearchHeaderMobile>
          Igrejas por Estado:{" "}
          <span style={{ color: colors.mainColor }}>
            {" "}
            {translateState(state)}
          </span>
          <SearchBarContainer>
            <SearchBar
              placeHolder={`Busque em ${capitalize(state)}`}
              showButtons={false}
            />
          </SearchBarContainer>
        </SearchHeaderMobile>

        <SearchResultsContainerMobile>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CircularProgress style={{ color: colors.mainColor }} />
            </div>
          ) : data && data.length > 0 ? (
            data?.map((item: any, index: number) => (
              <SearchResultMobile key={index}>
                <Item item={item} type={"churches"} fixedImgHeight />
              </SearchResultMobile>
            ))
          ) : (
            <p>Nenhuma igreja encontrada...</p>
          )}
        </SearchResultsContainerMobile>
      </SearchContainerMobile>
    );
  }

  return (
    <SearchContainer>
      <SearchHeader>
        Igrejas por Estado:{" "}
        <span style={{ color: colors.mainColor }}>
          {" "}
          {translateState(state)}
        </span>
        <SearchBarContainer>
          <SearchBar
            placeHolder={`Busque em ${capitalize(state)}`}
            showButtons={false}
          />
        </SearchBarContainer>
      </SearchHeader>

      <SearchResultsContainer>
        {isLoading ? (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <CircularProgress style={{ color: colors.mainColor }} />
          </div>
        ) : data && data.length > 0 ? (
          data?.map((item: any, index: number) => (
            <SearchResult key={index}>
              <Item item={item} type={"churches"} fixedImgHeight />
            </SearchResult>
          ))
        ) : (
          <p>Nenhuma igreja encontrada...</p>
        )}
      </SearchResultsContainer>
    </SearchContainer>
  );
};

const translateState = (sigla: string) => {
  switch (sigla) {
    case "AC":
      return "Acre";
    case "AL":
      return "Alagoas";
    case "AP":
      return "Amapá";
    case "AM":
      return "Amazonas";
    case "BA":
      return "Bahia";
    case "CE":
      return "Ceará";
    case "DF":
      return "Distrito Federal";
    case "ES":
      return "Espírito Santo";
    case "GO":
      return "Goiás";
    case "MA":
      return "Maranhão";
    case "MT":
      return "Mato Grosso";
    case "MS":
      return "Mato Grosso do Sul";
    case "MG":
      return "Minas Gerais";
    case "PA":
      return "Pará";
    case "PB":
      return "Paraíba";
    case "PR":
      return "Paraná";
    case "PE":
      return "Pernambuco";
    case "PI":
      return "Piauí";
    case "RJ":
      return "Rio de Janeiro";
    case "RN":
      return "Rio Grande do Norte";
    case "RS":
      return "Rio Grande do Sul";
    case "RO":
      return "Rondônia";
    case "RR":
      return "Roraima";
    case "SC":
      return "Santa Catarina";
    case "SP":
      return "São Paulo";
    case "SE":
      return "Sergipe";
    case "TO":
      return "Tocantins";
    default:
      return "";
  }
};
export default ChurchState;
