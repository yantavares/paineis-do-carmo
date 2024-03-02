import styled from "styled-components";

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
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  place-items: center;
`;

export const HeaderButton = styled.button`
  border: none;
  font-size: 1rem;
  transition: color 0.3s;
  &:hover {
    color: #588157;
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
  background-color: #588157;
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
