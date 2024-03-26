import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Item from "src/components/Item";
import { HomeTopicContainer, SeeMoreButton } from "./styles";

const HomeTopic = ({ data, type }) => {
  return (
    <HomeTopicContainer>
      <SeeMoreButton>
        <p>{getTypeText(type)}</p>
        <FontAwesomeIcon icon={faArrowRight} />
      </SeeMoreButton>
      <Item data={data} type={type} />
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
