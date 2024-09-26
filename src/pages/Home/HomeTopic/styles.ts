import styled from "styled-components";
import colors from "src/utils/colors";

export const HomeTopicContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const SeeMoreButton = styled.button`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  border: none;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  transition: all 0.3s;
  &:hover {
    color: ${colors.mainColor};
  }
  &:focus {
    outline: none;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  gap: 10rem;
  // justify-content: space-between;
`;
