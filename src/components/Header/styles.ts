import styled from "styled-components";
import colors from "src/utils/colors";

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 5%;
  border-bottom: 2px dashed var(--color-border);
`;

export const Col1 = styled.div`
  display: flex;
  gap: 3rem;
`;

export const Col2 = styled.div`
  display: flex;
  place-items: center;
  gap: 1.4rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30rem;
  gap: 1.4rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: ${colors.mainColor};
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
  background: transparent;
  font-size: 1.8rem;
  transition: color 0.3s;
  &:hover {
    color: ${colors.mainColor};
  }
  &:focus {
    outline: none;
  }
`;

export const Title = styled.h3`
  font-size: 2.5rem;
`;

export const ContribButton = styled.button`
  padding: 1rem 1.6rem;
  background-color: ${colors.mainColor};
  font-size: 1.6rem;
  color: white;
  border: none;
  border-radius: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${colors.lightMain};
  }
  &:focus {
    outline: #4a6a4f;
  }
`;

export const LoginButton = styled.button`
  padding: 1rem 1.6rem;
  font-size: 1.6rem;
  background-color: var(--color-surface);
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--color-surface-2);
  }
`;

export const Icon = styled.img`
  max-height: 4rem;
  max-width: 4rem;
`;

export const ThemeToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 10px;
  background: var(--color-surface);
  border: 2px solid var(--color-outline);
  color: var(--color-text);
  &:hover {
    background: var(--color-surface-2);
  }
`;
