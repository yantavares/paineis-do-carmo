import styled from "styled-components";
import colors from "src/utils/colors";

export const HomeTopicContainer = styled.div`
  width: 100%;
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
  width: 100%;
`;

export const DataContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4rem;
`;
