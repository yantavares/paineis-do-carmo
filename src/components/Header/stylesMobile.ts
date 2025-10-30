import styled from "styled-components";
import colors from "src/utils/colors";

export const HeaderContainerMobile = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  border-bottom: 2px dashed var(--color-border);
`;

export const Col1Mobile = styled.div`
  display: flex;
  gap: 3rem;
`;

export const Col2Mobile = styled.div`
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
  transition: background-color 0.3s;
  &:hover {
    background-color: #eeeeee;
  }
`;

export const Icon = styled.img`
  max-height: 4rem;
`;

export const MenuButton = styled.button`
  border: none;
  background: transparent;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.25s ease;
  z-index: 998;
`;

export const Drawer = styled.nav<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 260px;
  height: 100vh;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  gap: 0.75rem;
  z-index: 999;

  transform: translateX(${({ open }) => (open ? "0" : "100%")});
  transition: transform 0.25s ease;
`;

export const ThemeToggleRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
