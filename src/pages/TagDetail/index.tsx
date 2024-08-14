import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "src/components/Item";
import colors from "src/utils/colors";
import { brazilianPaintings } from "src/utils/mockData";
import { capitalize } from "src/utils/strings";
import {
  SearchContainer,
  SearchHeader,
  SearchResult,
  SearchResultsContainer,
  SearchSubHeader,
} from "./styles";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const TagDetail = () => {
  const { tag } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/tags/${tag}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tag]);

  return (
    <SearchContainer>
      <SearchHeader>
        Tópico: <span style={{ color: colors.green }}>{parseTag(tag)}</span>
      </SearchHeader>
      <SearchResultsContainer>
        {isLoading ? (
          <CircularProgress style={{ color: colors.green }} />
        ) : data && data.length > 0 ? (
          data.map((item: any, index: number) => (
            <SearchResult key={index}>
              <Item tagCount={2} width="20rem" item={item} type={"paintings"} />
            </SearchResult>
          ))
        ) : (
          <SearchSubHeader>Nenhuma obra foi encontrada...</SearchSubHeader>
        )}
      </SearchResultsContainer>
    </SearchContainer>
  );
};

const parseTag = (tag: string) => {
  return capitalize(tag.replace(/-/g, " "));
};

export default TagDetail;
