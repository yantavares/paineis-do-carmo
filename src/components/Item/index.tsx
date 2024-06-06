import React from "react";
import { Data, DataImage } from "./styles";
import { Church, Artist, Painting } from "src/utils/mockData";
import ArtistText from "./texts/ArtistText";
import ChurchText from "./texts/ChurchText";
import PaintingText from "./texts/PaintingText";
import Tags from "../Tags";
import { useNavigate } from "react-router-dom";

type ItemType = "artists" | "churches" | "paintings" | "";

interface ItemProps {
  item: Church | Artist | Painting;
  type: ItemType;
  fixedImgHeight?: boolean;
  width?: string | null;
  tagCount?: number;
}

const Item = ({
  item,
  type,
  fixedImgHeight = false,
  width = null,
  tagCount = -1, // -1 -> All tags
}: ItemProps) => {
  const navigate = useNavigate();
  return (
    <Data style={width && { width }}>
      <DataImage
        onClick={() => navigate(`/item/${type}/${item.id}`)}
        height={fixedImgHeight ? "100%" : "auto"}
        width={fixedImgHeight ? "100%" : "100%"}
        src={item.images[0].url}
        alt={"Item image"}
      />
      {getTypeInfo(type, item)}
      <Tags tagCount={tagCount} tags={item?.tag} />
    </Data>
  );
};

const getTypeInfo = (type: string, item: Church | Artist | Painting) => {
  switch (type) {
    case "artists":
      return <ArtistText artist={item as Artist} />;
    case "churches":
      return <ChurchText church={item as Church} />;
    case "paintings":
      return <PaintingText painting={item as Painting} />;
    default:
      return <></>;
  }
};
export default Item;
