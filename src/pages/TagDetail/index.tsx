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
} from "./styles";
import axios from "axios";

const TagDetail = () => {
  const { tag } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/paintings/tags${tag.toLocaleLowerCase()}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
        {data &&
          data.map((item: any, index: number) => (
            <SearchResult key={index}>
              <Item tagCount={2} width="20rem" item={item} type={"paintings"} />
            </SearchResult>
          ))}
      </SearchResultsContainer>
    </SearchContainer>
  );
};

const parseTag = (tag: string) => {
  return capitalize(tag.replace(/-/g, " "));
};

export default TagDetail;
