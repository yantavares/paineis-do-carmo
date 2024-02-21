import React, { useState } from "react";
import {
  BoxButton,
  BoxText,
  DropdownContent,
  RoundBoxContainer,
} from "./styles";

const RoundBox = ({ text, buttonText, color, videoURL = "dQw4w9WgXcQ" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <RoundBoxContainer color={color} $isopen={isOpen.toString()}>
        <BoxText>{text}</BoxText>
        <BoxButton onClick={toggleDropdown}>{buttonText}</BoxButton>
      </RoundBoxContainer>

      <DropdownContent color={color} $isopen={isOpen.toString()}>
        <iframe
          width="500"
          height="300"
          src={`https://www.youtube-nocookie.com/embed/${videoURL}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </DropdownContent>
    </>
  );
};

export default RoundBox;
