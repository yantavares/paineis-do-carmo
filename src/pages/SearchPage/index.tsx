import React, { useEffect, useState } from "react";
import {
  ColItem,
  GridCol,
  SearchBarContainer,
  SearchContainer,
  SearchHeader,
  SearchResultsContainer,
} from "./styles";
import { useParams } from "react-router-dom";
import { capitalize, translateTopicType } from "src/utils/strings";
import colors from "src/utils/colors";
import SearchBar from "src/components/SearchBar";
import Item from "src/components/Item";
import {
  Church,
  Artist,
  Painting,
  brazilianArtists,
  brazilianChurches,
  brazilianPaintings,
} from "src/utils/mockData";

const filterData = (
  data: Church[] | Artist[] | Painting[],
  start: number,
  step: number = 5
) => {
  const filteredData = [];
  for (let i = start; i < data.length; i += step) {
    filteredData.push(data[i]);
  }
  return filteredData;
};

const SearchPage = () => {
  const { selected } = useParams();

  const [data, setData] = useState<Church[] | Artist[] | Painting[]>([]);

  useEffect(() => {
    switch (selected) {
      case "artistas":
        setData(brazilianArtists.concat(brazilianArtists));
        break;
      case "igrejas":
        setData(brazilianChurches.concat(brazilianChurches));
        break;
      case "obras":
        setData(
          brazilianPaintings
            .concat(brazilianPaintings)
            .concat(brazilianPaintings)
            .concat(brazilianPaintings)
        );
        break;
      default:
        setData([]);
        break;
    }
  }, [selected]);

  return (
    <SearchContainer>
      <SearchHeader>
        Nossa Coleção de{" "}
        <span style={{ color: colors.green }}>{capitalize(selected)}</span>
        <SearchBarContainer>
          <SearchBar
            placeHolder={`Busque por ${selected}`}
            showButtons={false}
          />
        </SearchBarContainer>
      </SearchHeader>

      <SearchResultsContainer>
        <GridCol>
          {filterData(data, 0).map(
            (item: Church | Artist | Painting, index: number) => (
              <ColItem key={index}>
                <Item item={item} type={translateTopicType(selected)} />
              </ColItem>
            )
          )}
        </GridCol>
        <GridCol>
          {filterData(data, 1).map(
            (item: Church | Artist | Painting, index: number) => (
              <ColItem key={index}>
                <Item item={item} type={translateTopicType(selected)} />
              </ColItem>
            )
          )}
        </GridCol>
        <GridCol>
          {filterData(data, 2).map(
            (item: Church | Artist | Painting, index: number) => (
              <ColItem key={index}>
                <Item item={item} type={translateTopicType(selected)} />
              </ColItem>
            )
          )}
        </GridCol>
        <GridCol>
          {filterData(data, 3).map(
            (item: Church | Artist | Painting, index: number) => (
              <ColItem key={index}>
                <Item item={item} type={translateTopicType(selected)} />
              </ColItem>
            )
          )}
        </GridCol>
        <GridCol>
          {filterData(data, 4).map(
            (item: Church | Artist | Painting, index: number) => (
              <ColItem key={index}>
                <Item item={item} type={translateTopicType(selected)} />
              </ColItem>
            )
          )}
        </GridCol>
      </SearchResultsContainer>
    </SearchContainer>
  );
};
export default SearchPage;
