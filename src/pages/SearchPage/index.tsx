import React, { useEffect, useState } from "react";
import { SearchHeader } from "./styles";
import { useParams } from "react-router-dom";
import { capitalize } from "src/utils/strings";
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

const translateType = (type: string) => {
  switch (type) {
    case "artistas":
      return "artists";
    case "igrejas":
      return "churches";
    case "obras":
      return "paintings";
    default:
      return "";
  }
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
        setData(brazilianPaintings.concat(brazilianPaintings));
        break;
      default:
        setData([]);
        break;
    }
  }, [selected]);

  return (
    <div
      style={{
        padding: "2% 5%",
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
      }}
    >
      <SearchHeader>
        Nossa Coleção de{" "}
        <span style={{ color: colors.green }}>{capitalize(selected)}</span>
        <SearchBar placeHolder={`Busque por ${selected}`} showButtons={false} />
      </SearchHeader>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6.4rem 2.6rem",
          alignItems: "center",
        }}
      >
        {data.map((item: Church | Artist | Painting, index: number) => (
          <div
            key={index}
            style={{ height: "12rem", width: "calc(20% - 2.1rem)" }}
          >
            <Item item={item} type={translateType(selected)} fixedImgHeight />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchPage;
