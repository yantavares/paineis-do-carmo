import styled from "styled-components";
import colors from "src/utils/colors";

export const BigTag = styled.span`
  background-color: ${colors.white};
  border-radius: 2rem;
  color: #333;
  font-size: 2.5rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid #ddd;
  transition: all 0.3s;
  &:hover {
    border-color: ${colors.mainColor};
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const BigTagMobile = styled.span`
  background-color: ${colors.white};
  border-radius: 2rem;
  color: #333;
  font-size: 2rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid #ddd;
  transition: all 0.3s;
  &:hover {
    border-color: ${colors.mainColor};
    transform: scale(1.1);
    cursor: pointer;
  }
`;
