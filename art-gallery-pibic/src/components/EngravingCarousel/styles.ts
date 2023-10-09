import styled from "styled-components";

export const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  user-select: none;
  pointer-events: none;
`;

export const CarouselImage = styled.img`
  max-width: 90%;
  user-select: none;
  pointer-events: none;
`;
