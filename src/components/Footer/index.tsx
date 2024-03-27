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

const wppMessage =
  "Olá, gostaria de saber mais sobre o projeto Paineis do Carmo!";
const phoneNumber = "5561981020218";

const wppMessageFormatted = wppMessage.replace(" ", "%20");
const wppLink = `https://wa.me/${phoneNumber}?text=${wppMessageFormatted}`;

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
            <a href={wppLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} color="white" size="2xl" />
              <span className="tooltip-social">WhatsApp</span>
            </a>
            <a>
              <FontAwesomeIcon icon={faInstagram} color="white" size="2xl" />
              <span className="tooltip-social">Instagram</span>
            </a>
            <a
              href="https://github.com/yantavares/paineis-do-carmo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} color="white" size="2xl" />
              <span className="tooltip-social">GitHub</span>
            </a>
          </div>
        </SocialsContainer>
      </InnerDiv>
    </FooterContainer>
  );
};
export default Footer;
