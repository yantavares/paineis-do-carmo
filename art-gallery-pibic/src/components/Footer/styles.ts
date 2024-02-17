import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 22rem;
  background-color: #588157;
  color: white;
  margin-top: 3rem;
  padding: 2% 0;
`;

export const DashedLine = styled.div`
  border: 1px dashed rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 1px;
  margin: 2rem 0;
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
  gap: 1rem;
`;

export const TitleText = styled.h3`
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
`;

export const FinancingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  gap: 1rem;
  width: 25%;
`;

export const SocialsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Socials = styled.div`
  display: flex;
  gap: 1rem;
`;
