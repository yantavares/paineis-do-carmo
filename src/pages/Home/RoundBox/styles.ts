import styled from "styled-components";

interface RoundBoxProps {
  color: string;
  $isopen: string;
}

export const RoundBoxContainer = styled.div<RoundBoxProps>`
  background-color: ${(props) => props.color};
  border-radius: ${(props) =>
    props.$isopen === "true" ? "2rem 2rem 0 0" : "2rem"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  transition: all 0.4s ease-in-out;
`;

export const BoxText = styled.h2`
  color: white;
  font-size: 3rem;
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
  transition: ${(props) =>
    props.$isopen === "true"
      ? "max-height 0.6s ease-in, opacity 0.2s ease-in"
      : "max-height 0.6s ease-out, opacity 0.4s ease-out"};
  max-height: ${(props) => (props.$isopen === "true" ? "500px" : "0")};
  opacity: ${(props) => (props.$isopen === "true" ? "1" : "0")};
  overflow: hidden;
  color: white;
  padding: 2rem;
  border-radius: 0 0 2rem 2rem;
  margin-bottom: ${(props) => (props.$isopen === "true" ? "1.6rem" : "0")};

  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
`;
