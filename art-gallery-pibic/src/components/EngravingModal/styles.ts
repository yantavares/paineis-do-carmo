import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: lightgray;
  border: 3px solid gray;
  color: black;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
`;

export const ModalAuthor = styled.h2`
  font-size: 1.2rem;
`;

export const ModalImage = styled.img`
  height: 20rem;
  border-radius: 10px;
`;
