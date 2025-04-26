import styled from "styled-components";
import colors from "src/utils/colors";

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 40%;
  background-color: ${colors.darkMain};
  color: white;
  margin-top: 8rem;
  padding: 2% 0;
  width: 100%;
`;

export const DashedLine = styled.div`
  border: 1px dashed rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  margin-top: 2rem;
`;

export const LogoMain = styled.img`
  align-self: flex-start;
  padding-left: 5%;
`;

export const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 25%;
`;

export const CreditsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 25%;
`;

export const Author = styled.a`
  color: white;
  font-weight: 550;
  transition: all 0.3s;
`;

export const TitleText = styled.h3`
  font-weight: 700;
  font-size: 1.8rem;
  padding: 0;
  margin: 0;
`;

export const Text = styled.p`
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
`;

export const FooterButton = styled.button`
  color: white;
  width: fit-content;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.04);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const FinancingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  gap: 1rem;
  width: 25%;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SocialsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
