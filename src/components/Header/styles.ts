import styled from "styled-components";
import colors from "src/utils/colors";

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 5%;
`;

export const Col1 = styled.div`
  display: flex;
  gap: 2rem;
`;

export const Col2 = styled.div`
  display: flex;
  place-items: center;
  gap: 0.8rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: ${colors.green};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  place-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderButton = styled.button`
  border: none;
  font-size: 1rem;
  transition: color 0.3s;
  &:hover {
    color: ${colors.green};
  }
  &:focus {
    outline: none;
  }
`;

export const Title = styled.h3`
  font-size: 1.5rem;
`;

export const ContribButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${colors.green};
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #4a6a4f;
  }
  &:focus {
    outline: #4a6a4f;
  }
`;

export const LoginButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #eeeeee;
  }
`;
