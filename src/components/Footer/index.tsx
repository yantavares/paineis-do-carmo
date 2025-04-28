import React from "react";
import {
  Author,
  ContactContainer,
  CreditsContainer,
  DashedLine,
  FinancingContainer,
  FooterButton,
  FooterContainer,
  InnerDiv,
  LogoMain,
  SocialsContainer,
  Text,
  TextContainer,
  TitleText,
} from "./styles";
import logoMain from "src/assets/utils/logo-alt.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./social-media.css";
import { useNavigate } from "react-router-dom";
import {
  AuthorMobile,
  ContactContainerMobile,
  CreditsContainerMobile,
  FinancingContainerMobile,
  FooterButtonMobile,
  FooterContainerMobile,
  InnerDivMobile,
  LogoMainMobile,
  SocialsContainerMobile,
  TextContainerMobile,
  TextMobile,
  TitleTextMobile,
} from "./stylesMobile";

const wppMessage =
  "Olá, gostaria de saber mais sobre o projeto Paineis do Carmo!";
const phoneNumber = "";

const wppMessageFormatted = wppMessage.replace(" ", "%20");
const wppLink = `https://wa.me/${phoneNumber}?text=${wppMessageFormatted}`;

const Footer = ({ isMobile = false }) => {
  const navigate = useNavigate();
  if (isMobile) {
    return (
      <FooterContainerMobile>
        <LogoMainMobile height={35} src={logoMain} alt="Paint Bucket" />
        <InnerDivMobile>
          <TextContainerMobile>
            <ContactContainerMobile>
              <TitleTextMobile>Ficou curioso?</TitleTextMobile>
              <TextMobile>
                Entre em contato para saber mais sobre o projeto
              </TextMobile>
              <FooterButtonMobile>
                <a href="mailto:yantdo1@gmail.com" style={{ all: "unset" }}>
                  Entrar em contato
                </a>
              </FooterButtonMobile>
            </ContactContainerMobile>
            <CreditsContainerMobile>
              <TitleTextMobile>Créditos</TitleTextMobile>
              <TextMobile>
                <AuthorMobile href="https://github.com/gabrielccac">
                  Gabriel Farago
                </AuthorMobile>{" "}
              </TextMobile>
              <TextMobile>
                <AuthorMobile href="https://github.com/GuilhermeGonSoares">
                  Guilherme Gonçalves
                </AuthorMobile>{" "}
              </TextMobile>
              <TextMobile>
                <AuthorMobile
                  href="https://github.com/yantavares"
                  target="_blank"
                >
                  Yan Tavares
                </AuthorMobile>
              </TextMobile>
            </CreditsContainerMobile>
            <FinancingContainerMobile>
              <TitleTextMobile>
                Este projeto foi financiado pela Universidade de Brasília
              </TitleTextMobile>
              <FooterButtonMobile onClick={() => navigate("/sobre")}>
                Saber mais
              </FooterButtonMobile>
            </FinancingContainerMobile>
          </TextContainerMobile>
          <SocialsContainerMobile>
            <DashedLine />
            <div className="social-media">
              <a
                href={wppLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ maxWidth: "2rem" }}
              >
                <FontAwesomeIcon
                  style={{ maxWidth: "2rem" }}
                  icon={faWhatsapp}
                  color="white"
                  size="2xl"
                />
                <span className="tooltip-social">WhatsApp</span>
              </a>
              {/* <a
              href="https://www.instagram.com/museu_barroco/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} color="white" size="2xl" />
              <span className="tooltip-social">Instagram</span>
            </a> */}
              <a
                href="https://github.com/yantavares/paineis-do-carmo"
                target="_blank"
                rel="noopener noreferrer"
                style={{ maxWidth: "2rem" }}
              >
                <FontAwesomeIcon
                  style={{ maxWidth: "2rem" }}
                  icon={faGithub}
                  color="white"
                  size="2xl"
                />
                <span className="tooltip-social">GitHub</span>
              </a>
            </div>
          </SocialsContainerMobile>
        </InnerDivMobile>
      </FooterContainerMobile>
    );
  }
  return (
    <FooterContainer>
      <LogoMain height={35} src={logoMain} alt="Paint Bucket" />
      <InnerDiv>
        <TextContainer>
          <ContactContainer>
            <TitleText>Ficou curioso?</TitleText>
            <Text>Entre em contato para saber mais sobre o projeto</Text>
            <FooterButton>
              <a href="mailto:yantdo1@gmail.com" style={{ all: "unset" }}>
                Entrar em contato
              </a>
            </FooterButton>
          </ContactContainer>
          <CreditsContainer>
            <TitleText>Créditos</TitleText>
            <Text>
              <Author href="https://github.com/gabrielccac">
                Gabriel Farago
              </Author>{" "}
              UI/UX e Front End
            </Text>
            <Text>
              <Author href="https://github.com/GuilhermeGonSoares">
                Guilherme Gonçalves
              </Author>{" "}
              Back End
            </Text>
            <Text>
              <Author href="https://github.com/yantavares" target="_blank">
                Yan Tavares
              </Author>
              Front End e integração com IA
            </Text>
          </CreditsContainer>
          <FinancingContainer>
            <TitleText>
              Este projeto foi financiado pela Universidade de Brasília
            </TitleText>
            <FooterButton onClick={() => navigate("/sobre")}>
              Saber mais
            </FooterButton>
          </FinancingContainer>
        </TextContainer>
        <SocialsContainer>
          <DashedLine />
          <div className="social-media">
            {/* <a
              href={wppLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ maxWidth: "fit-content" }}
            >
              <FontAwesomeIcon icon={faWhatsapp} color="white" size="2xl" />
              <span className="tooltip-social">WhatsApp</span>
            </a> */}
            {/* <a
              href="https://www.instagram.com/museu_barroco/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} color="white" size="2xl" />
              <span className="tooltip-social">Instagram</span>
            </a> */}
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
