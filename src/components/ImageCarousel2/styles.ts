import styled from "styled-components";

export const ImageContainer = styled.div`
  height: 100%;
  &:focus {
    outline: none;
  }
`;

export const SliderImage = styled.img`
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  border-radius: 2rem;
`;
