import styled from "styled-components";
import colors from "src/utils/colors";

export const Container = styled.div`
  width: 100%;
  padding: 2% 8%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.5rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.gray};
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  transition: all 0.3s ease-in-out;
  border-radius: 2rem;
  font-size: 1.1rem;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Header = styled.a`
  cursor: pointer;
  font-size: 3rem;
  font-weight: bold;
  margin: 1.4rem 0;
  color: ${colors.darkGreen};
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
    color: ${colors.green};
  }
`;

export const MainButton = styled.button`
  background-color: transparent;
  background-image: linear-gradient(45deg, green, ${colors.lightGreen});
  color: white;
  border-radius: 2rem;
  transition: all 0.3s ease-in-out;
  font-size: 1.1rem;
  &:hover {
    transform: scale(1.1);
  }
`;

export const SmallText = styled.p`
  font-size: 1rem;
`;
