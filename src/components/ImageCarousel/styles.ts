import styled from "styled-components";

export const ImageContainer = styled.div`
  height: 150px;
  &:focus {
    outline: none;
  }
`;

export const SliderImage = styled.img`
  width: 90%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`;
