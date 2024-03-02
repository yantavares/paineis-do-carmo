import React from "react";
import {
  ContactContainer,
  DashedLine,
  FinancingContainer,
  FooterButton,
  FooterContainer,
  InnerDiv,
  PaintBucket,
  SocialsContainer,
  Text,
  TextContainer,
  TitleText,
} from "./styles";
import paintBucket from "src/assets/paint-bucket-alt.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./social-media.css";

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
          <div className="social-media">
            <a href="">
              <FontAwesomeIcon icon={faWhatsapp} color="white" size="lg" />
              <span className="tooltip-social">WhatsApp</span>
            </a>
            <a href="">
              <FontAwesomeIcon icon={faInstagram} color="white" size="lg" />
              <span className="tooltip-social">Instagram</span>
            </a>
            <a href="">
              <FontAwesomeIcon icon={faGithub} color="white" size="lg" />
              <span className="tooltip-social">GitHub</span>
            </a>
          </div>
        </SocialsContainer>
      </InnerDiv>
    </FooterContainer>
  );
};
export default Footer;
