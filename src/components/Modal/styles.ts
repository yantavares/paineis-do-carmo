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
  overflow-y: auto; /* Enable scrolling within the modal content */
  overflow-x: hidden; /* Hide horizontal scrollbar */

  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d3d3d3; /* Light gray color for the scrollbar thumb */
    border-radius: 30px; /* Rounded edges for the scrollbar thumb */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* Transparent background for the scrollbar track */
    border-radius: 30px; /* Rounded edges for the scrollbar track */
  }

  &::-webkit-scrollbar-button {
    display: none; /* Remove the small arrows on the edges of the scrollbar */
  }

  /* For Firefox */
  scrollbar-width: thin; /* Thin scrollbar width */
  scrollbar-color: #d3d3d3 transparent; /* Thumb and track color */
`;
