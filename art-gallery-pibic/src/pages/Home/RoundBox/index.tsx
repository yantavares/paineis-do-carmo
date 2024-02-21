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
        {/* <iframe
          width="100%"
          height="300"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
        /> */}
        <p>Some additional text here</p>
      </DropdownContent>
    </>
  );
};

export default RoundBox;
