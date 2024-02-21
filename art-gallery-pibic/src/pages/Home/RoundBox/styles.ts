import styled from "styled-components";

interface RoundBoxProps {
  color: string;
  $isopen: string;
}

export const RoundBoxContainer = styled.div<RoundBoxProps>`
  background-color: ${(props) => props.color};
  border-radius: ${(props) =>
    props.$isopen === "true" ? "1rem 1rem 0 0" : "1rem"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  transition: all 0.5s;
`;

export const BoxText = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: 600;
`;

export const BoxButton = styled.button`
  color: white;
  background-color: transparent;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.04);
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

interface DropdownContentProps {
  color: string;
  $isopen: string;
}

export const DropdownContent = styled.div<DropdownContentProps>`
  background-color: ${(props) => props.color};
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
  max-height: ${(props) => (props.$isopen === "true" ? "500px" : "0")};
  opacity: ${(props) => (props.$isopen === "true" ? "1" : "0")};
  overflow: hidden;
  color: white;
  padding: 1rem;
  border-radius: 0 0 1rem 1rem;
`;
