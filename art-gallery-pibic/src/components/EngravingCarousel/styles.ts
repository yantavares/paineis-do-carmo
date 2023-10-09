import styled from "styled-components";

export const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  user-select: none;

  :hover {
    cursor: pointer;
  }
`;

export const CarouselImage = styled.img`
  max-width: 90%;

  height: 25rem;
`;
