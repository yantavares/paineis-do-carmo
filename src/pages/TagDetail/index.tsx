import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "src/components/Item";
import colors from "src/utils/colors";
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
import {
  SearchContainerMobile,
  SearchHeaderMobile,
  SearchResultMobile,
  SearchResultsContainerMobile,
} from "../SearchPage/stylesMobile";

const TagDetail = () => {
  const { tag } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let noDataTimeout;

    const fetchData = async () => {
      setIsLoading(true);
      setShowNoDataMessage(false);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/paintings/tags/${tag}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);

        noDataTimeout = setTimeout(() => {
          setShowNoDataMessage(true);
        }, 200);
      }
    };

    fetchData();

    return () => clearTimeout(noDataTimeout);
  }, [tag]);

  if (isMobile) {
    return (
      <SearchContainerMobile>
        <SearchHeaderMobile>
          Tópico:{" "}
          <span style={{ color: colors.mainColor }}>{parseTag(tag)}</span>
        </SearchHeaderMobile>
        <SearchResultsContainerMobile>
          {isLoading ? (
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress style={{ color: colors.mainColor }} />
            </div>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <SearchResultMobile key={index}>
                <Item
                  tagCount={2}
                  width="20rem"
                  item={item}
                  type={"paintings"}
                />
              </SearchResultMobile>
            ))
          ) : (
            showNoDataMessage && (
              <SearchSubHeader>Nenhuma obra foi encontrada...</SearchSubHeader>
            )
          )}
        </SearchResultsContainerMobile>
      </SearchContainerMobile>
    );
  }

  return (
    <SearchContainer>
      <SearchHeader>
        Tópico: <span style={{ color: colors.mainColor }}>{parseTag(tag)}</span>
      </SearchHeader>
      <SearchResultsContainer>
        {isLoading ? (
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress style={{ color: colors.mainColor }} />
          </div>
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <SearchResult key={index}>
              <Item tagCount={2} width="20rem" item={item} type={"paintings"} />
            </SearchResult>
          ))
        ) : (
          showNoDataMessage && (
            <SearchSubHeader>Nenhuma obra foi encontrada...</SearchSubHeader>
          )
        )}
      </SearchResultsContainer>
    </SearchContainer>
  );
};

const parseTag = (tag) => {
  return capitalize(tag.replace(/-/g, " "));
};

export default TagDetail;
