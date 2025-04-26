import styled from "styled-components";
import colors from "src/utils/colors";

export const FooterContainerMobile = styled.footer`
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

export const LogoMainMobile = styled.img`
  align-self: flex-start;
  padding-left: 5%;
  margin-top: 2rem;
`;

export const InnerDivMobile = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const TextContainerMobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContactContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding-right: 1rem;
`;

export const CreditsContainerMobile = styled.div`
  padding: 0;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthorMobile = styled.a`
  color: white;
  font-size: 1.6rem;
  font-weight: 450;
  transition: all 0.3s;
`;

export const TitleTextMobile = styled.h3`
  font-weight: 700;
  font-size: 1.8rem;
  padding: 0;
  margin: 0;
`;

export const TextMobile = styled.p`
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
`;

export const FooterButtonMobile = styled.button`
  color: white;
  width: fit-content;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.04);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const FinancingContainerMobile = styled.div`
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

export const SocialsContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
`;
