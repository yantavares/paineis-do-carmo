import React from "react";
import {
  ContactContainer,
  DashedLine,
  FinancingContainer,
  FooterButton,
  FooterContainer,
  InnerDiv,
  PaintBucket,
  Socials,
  SocialsContainer,
  Text,
  TextContainer,
  TitleText,
} from "./styles";
import paintBucket from "src/assets/paint-bucket-alt.svg";
import wpp from "src/assets/wpp.svg";
import insta from "src/assets/insta.svg";

const Footer = () => {
  return (
    <FooterContainer>
      <PaintBucket src={paintBucket} alt="Paint Bucket" />
      <InnerDiv>
        <TextContainer>
          <ContactContainer>
            <TitleText>Ficou curioso?</TitleText>
            <Text>Entre em contato para saber mais sobre o projeto</Text>
            <FooterButton>Entrar em contato</FooterButton>
          </ContactContainer>
          <FinancingContainer>
            <TitleText>
              Este projeto foi financiado pela Universidade de Brasília
            </TitleText>
            <FooterButton>Saber mais</FooterButton>
          </FinancingContainer>
        </TextContainer>
        <SocialsContainer>
          <DashedLine />
          <Socials>
            <img src={wpp} alt="Whatsapp" />
            <img src={insta} alt="Instagram" />
          </Socials>
        </SocialsContainer>
      </InnerDiv>
    </FooterContainer>
  );
};
export default Footer;
