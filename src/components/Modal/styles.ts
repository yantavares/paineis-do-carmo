import styled from "styled-components";

export const Container = styled.div`
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto; /* Allow scrolling if content exceeds viewport */
`;

export const ModalContent = styled.div`
  background: white;
  max-height: 80%;
  border-radius: 2rem;
  overflow-y: auto; /* Enable scrolling within the modal content */
  overflow-x: hidden; /* Hide horizontal scrollbar */
`;
