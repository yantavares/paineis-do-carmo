import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 60rem;
  &:focus {
    outline: none;
  }
`;

export const SliderImage = styled.img`
  width: 98%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 2rem;
`;

export const DownloadButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;
