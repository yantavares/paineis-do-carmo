import {
  FooterContainer,
  FooterContent,
  FooterLink,
  FooterSection,
  FooterTitle,
  HorizontalDivider,
} from "./styles";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>SOBRE</FooterTitle>
          <FooterLink>Projeto de Pesquisa</FooterLink>
          <FooterLink>Professor Orientador</FooterLink>
          <FooterLink>Autor do Trabalho</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>NAVEGAÇÃO</FooterTitle>
          <FooterLink>Home</FooterLink>
          <FooterLink>Galeria de Obras</FooterLink>
          <FooterLink>Igrejas</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>WEBSITE</FooterTitle>
          <FooterLink>Desenvolvimento</FooterLink>
          <FooterLink>GitHub do Projeto</FooterLink>
          <FooterLink>Tecnologias Utilizadas</FooterLink>
        </FooterSection>
        <HorizontalDivider />
        <FooterSection>
          <FooterTitle>CONTATO</FooterTitle>
          <FooterLink>Redes Sociais</FooterLink>
          <FooterLink>E-mail</FooterLink>
          <FooterLink>Telefone</FooterLink>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};
export default Footer;
