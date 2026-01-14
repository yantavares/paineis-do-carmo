import styled from "styled-components";

export const Data = styled.div`
  height: 100%;
  cursor: pointer;
`;

export const DataImage = styled.img<{ height?: string }>`
  max-width: 100%;
  border-radius: 0.8rem;
  transition: all 0.3s;
  max-height: ${props => props.height === "100%" ? "30rem" : "40rem"};
  min-height: ${props => props.height === "100%" ? "30rem" : "auto"};
  height: ${props => props.height === "100%" ? "30rem" : "auto"};
  &:hover {
    transform: scale(1.02);
    filter: brightness(0.9);
  }
  object-fit: cover;
`;
