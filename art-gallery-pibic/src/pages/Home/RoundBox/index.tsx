// Import useState from React
import React, { useState } from "react";
import {
  BoxButton,
  BoxText,
  DropdownContent,
  RoundBoxContainer,
} from "./styles";

const RoundBox = ({ text, buttonText, color }) => {
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
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <p>Some additional text here</p>
      </DropdownContent>
    </>
  );
};

export default RoundBox;
