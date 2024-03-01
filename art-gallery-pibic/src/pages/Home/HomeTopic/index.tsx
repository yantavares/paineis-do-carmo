import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Artist, Church, Painting } from "../mockData";
import {
  Data,
  DataContainer,
  DataImage,
  HomeTopicContainer,
  SeeMoreButton,
} from "./styles";
import ChurchText from "./texts/ChurchText";
import ArtistText from "./texts/ArtistText";
import PaintingText from "./texts/PaintingText";

const HomeTopic = ({ data, type }) => {
  return (
    <HomeTopicContainer>
      <SeeMoreButton>
        <p>{getTypeText(type)}</p>
        <FontAwesomeIcon icon={faArrowRight} />
      </SeeMoreButton>
      <DataContainer>
        {data.map((item: Church) => (
          <Data>
            <DataImage src={item.image} alt={item.name} />
            {getTypeInfo(type, item)}
          </Data>
        ))}
      </DataContainer>
    </HomeTopicContainer>
  );
};

const getTypeText = (type: string) => {
  switch (type) {
    case "artists":
      return "Ver todos os artistas";
    case "churches":
      return "Ver todas as igrejas";
    case "paintings":
      return "Ver todas as obras";
    default:
      return "Wrong type!";
  }
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
export default HomeTopic;
