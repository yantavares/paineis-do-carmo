import styled from "styled-components";

export const ImageContainer = styled.div`
  height: 300px;
  &:focus {
    outline: none;
  }
`;

export const SliderImage = styled.img`
  width: 82%;
  height: 95%;
  object-fit: cover;
  border-radius: 1rem;
`;
