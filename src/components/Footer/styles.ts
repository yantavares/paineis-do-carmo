import styled from "styled-components";
import colors from "src/utils/colors";

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 40%;
  background-color: ${colors.green};
  color: white;
  margin-top: 8rem;
  padding: 2% 0;
`;

export const DashedLine = styled.div`
  border: 1px dashed rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  margin-top: 2rem;
`;

export const PaintBucket = styled.img`
  align-self: flex-start;
  padding-left: 5%;
`;

export const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
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
`;

export const TitleText = styled.h3`
  font-weight: 700;
  font-size: 1.8rem;
  padding: 0;
  margin: 0;
`;

export const Text = styled.p`
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
