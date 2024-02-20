import styled from "styled-components";

export const RoundBoxContainer = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-radius: 1rem;
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
