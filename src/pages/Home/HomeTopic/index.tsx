import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import Item from "src/components/Item";
import { Artist, Church, Painting } from "src/utils/mockData";
import { translateBackTopicType } from "src/utils/strings";
import { DataContainer, HomeTopicContainer, SeeMoreButton } from "./styles";
import { navigateNoScroll } from "src/utils/wrappers";

const HomeTopic = ({ data, type }) => {
  const navigate = useNavigate();

  return (
    <HomeTopicContainer>
      <SeeMoreButton
        onClick={() =>
          navigateNoScroll(
            navigate,
            `/pesquisa/${translateBackTopicType(type)}`
          )
        }
      >
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
      return "Ver todos os artifices";
    case "churches":
      return "Ver todas as igrejas";
    case "paintings":
      return "Ver todas as obras";
    default:
      return "Wrong type!";
  }
};

export default HomeTopic;
