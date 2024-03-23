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
    color: ${colors.green};
  }
  &:focus {
    outline: none;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Data = styled.div`
  width: 18%;
`;

export const DataImage = styled.img`
  max-width: 100%;
  border-radius: 0.8rem;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
    filter: brightness(0.9);
  }
`;
