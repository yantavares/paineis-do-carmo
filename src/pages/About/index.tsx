import React from "react";
import {
  AboutSpan,
  AboutText,
  AboutUs,
  AboutUsContainer,
  AboutUsHeader,
  AboutUsText,
  HorizontalLine,
  PaddingContainer,
  Us,
} from "./styles";

const AboutPage = () => {
  return (
    <PaddingContainer>
      <AboutText>
        O presente site é fruto do projeto{" "}
        <AboutSpan>
          “As pinturas barrocas de Santa Teresa D'Ávila nas Igrejas das Ordens
          Terceiras Carmelitas da América portuguesa (Séc. XVII a XIX)”{" "}
        </AboutSpan>
        , contemplado com a Bolsa Produtividade CNPQ 2 e atrelado ao grupo de
        pesquisa CNPQ{" "}
        <AboutSpan>
          “Arte, Cultura e Sociedade no Mundo Ibérico (séculos XVI a XIX)”.
        </AboutSpan>
      </AboutText>

      <HorizontalLine />
      <AboutText>
        O papel do clero regular na catequização dos povos foi fundamental para
        a consolidação do catolicismo na América portuguesa. No além-mar, as
        ordens primeiras possuíam a prerrogativa de administrar sacramentos e
        celebrar missas, tornando-se fortes instrumentos de conversão e
        cristianização de colonos, escravizados e indígenas. Destacavam-se
        também as irmandades leigas e as ordens terceiras, as quais permitiam
        que pessoas comuns, que não haviam professado votos de castidade,
        pudessem estabelecer vínculos mais fortes com a religião, submetendo-se
        a um estatuto.
      </AboutText>

      <AboutText>
        A conversão ao cristianismo não se realizava apenas através das
        palavras, mas também por meio da iconografia sacra, visto que a própria
        Igreja a considerava como sendo uma escrita dos iletrados. Daí o cuidado
        para que essas imagens fossem decorosas, induzindo o espectador à
        verdadeira fé e evitando erros ou exageros. Para isso, “copiavam-se”
        modelos canônicos de imagens que vinham da Europa na forma de gravuras.
      </AboutText>

      <AboutText>
        O uso de gravuras na produção das imagens sacras ditas “barrocas” na
        América portuguesa já é largamente conhecido pela comunidade científica
        que pesquisa a área. Sabe-se que boa parte da produção imagética se
        inspira nesses gravados produzidos na Europa e disseminados em papeis
        avulsos, dentro de livros, ou em destaques para as crônicas religiosas e
        hagiografias.
      </AboutText>

      <AboutText>
        Com o advento da internet e a digitalização de acervos de museus e
        conventos, esse tipo de pesquisa sofreu avanços consideráveis, que se
        apresentaram em formas de monografias, dissertações e teses. No entanto,
        muitas vezes um trabalho iconográfico poderia ser facilitado pela
        construção de um banco de dados que reunisse as pinturas e suas matrizes
        iconográficas, a exemplo do que já ocorre em outros países, como o site
        colonialart, do México.
      </AboutText>

      <AboutText>
        No intuito de viabilizar a apresentação dos dados obtidos em nossas
        pesquisas, criou-se, junto ao Programa de Iniciação Científica da
        Universidade de Brasília, o Projeto{" "}
        <AboutSpan>
          “Divulgação científica por meio da web: construindo o site para o
          projeto As pinturas barrocas de Santa Teresa D'Ávila nas Igrejas das
          Ordens Terceiras Carmelitas da América portuguesa (Séc. XVII a XIX)”
        </AboutSpan>{" "}
        que contou, inicialmente, com três planos de trabalho voltados para
        construção de um sítio eletrônico produzido por discentes da Ciência da
        Computação.
      </AboutText>

      <AboutText>
        Com a utilização de uma ferramenta facilitadora para o encontro dessas
        matrizes iconográficas, as pesquisas sobre imagética sacra na América
        portuguesa poderiam dar um novo salto qualitativo, com a produção de
        estudos comparativos regionais almejando a iconologia como objeto
        principal.
      </AboutText>

      <AboutText>
        O site Museu Barroco possui o propósito de ser essa ferramenta
        facilitadora. Para isso, contamos com um espaço de contribuição dos
        usuários, em que vocês poderão se cadastrar para que suas contribuições
        imagéticas possam figurar no site, abrangendo assim pesquisadores a
        nível nacional e internacional.
      </AboutText>

      <AboutText>
        Assim, desejamos a vocês a melhor acolhida possível, tanto para que
        achem o que buscam, quanto para contribuir com o seu conteúdo.
      </AboutText>

      <AboutUsContainer>
        <AboutUs style={{ textAlign: "start" }}>
          <AboutUsHeader>Coordenadores</AboutUsHeader>
          <AboutUsText>Prof. Dr. André Cabral Honor (UnB/POSHIS)</AboutUsText>
          <AboutUsText>
            Doutorando Rafael Lima Meireles de Queiroz (POSHIS)
          </AboutUsText>
        </AboutUs>

        <AboutUs style={{ textAlign: "end" }}>
          <AboutUsHeader>Discentes Proic (2023-2024)</AboutUsHeader>
          <AboutUsText>
            <Us href="https://github.com/yantavares" target="_blank">
              Yan Tavares{" "}
            </Us>{" "}
            (Bolsista Engenharia da Computação)
          </AboutUsText>
          <AboutUsText>
            <Us href="https://github.com/GuilhermeGonSoares">
              Guilherme Soares{" "}
            </Us>
            (Bolsista Engenharia da Computação){" "}
          </AboutUsText>
          <AboutUsText>
            <Us href="https://github.com/gabrielccac">Gabriel Farago </Us>
            (Voluntário Engenharia da Computação){" "}
          </AboutUsText>
        </AboutUs>
      </AboutUsContainer>
    </PaddingContainer>
  );
};
export default AboutPage;
