import styled from "styled-components";

export const Data = styled.div`
  height: 100%;
`;

export const DataImage = styled.img`
  max-width: 100%;
  border-radius: 0.8rem;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
    filter: brightness(0.9);
  }
  object-fit: cover;
`;
