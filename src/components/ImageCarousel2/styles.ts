import styled from "styled-components";

export const ImageContainer = styled.div`
  height: 100%;
  &:focus {
    outline: none;
  }
`;

export const SliderImage = styled.img`
  max-width: 82%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 2rem;
`;
