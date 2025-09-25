import styled from "styled-components";
import colors from "src/utils/colors";

export const BigTag = styled.span`
  background-color: #fff;
  border-radius: 2rem;
  color: #333;
  font-size: 2.5rem;
  padding: 1.25rem 1.5rem;
  border: 2px solid #ddd;
  max-width: 45rem;
  transition: all 0.3s;
  flex: 1 1 auto;
  text-align: center;
  &:hover {
    border-color: ${colors.mainColor};
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const BigTagMobile = styled.span`
  background-color: #fff;
  border-radius: 2rem;
  color: #333;
  flex: 1 1 auto;
  max-width: 80%;
  font-size: 1.8rem;
  padding: 1.25rem 1.5rem;
  border: 2px solid #ddd;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    border-color: ${colors.mainColor};
    transform: scale(1.1);
    cursor: pointer;
  }
`;
