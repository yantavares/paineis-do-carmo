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
  overflow: auto;

  .close-btn {
    background-color: transparent;
    border: none;
    color: #202020;
    padding: 0.25rem;

    &:hover {
      color: #000;
    }

    &:focus {
      outline: none;
    }
  }
`;

export const ModalContent = styled.div`
  background: white;
  max-height: 80%;
  border-radius: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d3d3d3;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  scrollbar-width: thin;
  scrollbar-color: #d3d3d3 transparent;
`;
