import styled from "styled-components";

export const ImageContainer = styled.div`
  height: 100%;
  &:focus {
    outline: none;
  }
`;

export const SliderImage = styled.img`
  width: 82%;
  height: 95%;
  object-fit: cover;
  border-radius: 2rem;
`;
