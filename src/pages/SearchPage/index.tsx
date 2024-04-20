import React, { useEffect, useState } from "react";
import {
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
import ChurchMap from "./churchMap";

const SearchPage = () => {
  const { selected } = useParams();

  const [data, setData] = useState<Church[] | Artist[] | Painting[]>([]);

  useEffect(() => {
    switch (selected) {
      case "artifices":
        setData(brazilianArtists.concat(brazilianArtists));
        break;
      case "igrejas":
        setData(brazilianChurches.concat(brazilianChurches));
        break;
      case "obras":
        setData(brazilianPaintings.concat(brazilianPaintings));
        break;
      default:
        setData([]);
        break;
    }
  }, [selected]);

  return (
    <SearchContainer>
      {selected !== "igrejas" ? (
        <>
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
            {data.map((item: Church | Artist | Painting, index: number) => (
              <div
                key={index}
                style={{ height: "20rem", width: "calc(20% - 2.92rem)" }}
              >
                <Item
                  item={item}
                  type={translateTopicType(selected)}
                  fixedImgHeight
                />
              </div>
            ))}
          </SearchResultsContainer>
        </>
      ) : (
        <ChurchMap />
      )}
    </SearchContainer>
  );
};
export default SearchPage;
