import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Item from "src/components/Item";
import { DataContainer, HomeTopicContainer, SeeMoreButton } from "./styles";
import { Church, Artist, Painting } from "src/utils/mockData";

const HomeTopic = ({ data, type }) => {
  return (
    <HomeTopicContainer>
      <SeeMoreButton>
        <p>{getTypeText(type)}</p>
        <FontAwesomeIcon icon={faArrowRight} />
      </SeeMoreButton>
      <DataContainer>
        {data.map((item: Church | Artist | Painting, index: number) => (
          <div style={{ width: "18%" }}>
            <Item item={item} type={type} key={index} />
          </div>
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

export default HomeTopic;
