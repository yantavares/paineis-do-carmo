import React from "react";
import { BoxButton, BoxText, RoundBoxContainer } from "./styles";

const RoundBox = ({ text, buttonText, color }) => {
  return (
    <RoundBoxContainer color={color}>
      <BoxText>{text}</BoxText>
      <BoxButton>{buttonText}</BoxButton>
    </RoundBoxContainer>
  );
};
export default RoundBox;
