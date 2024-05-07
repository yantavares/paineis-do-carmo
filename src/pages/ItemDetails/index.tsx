import React from "react";
import Foto1 from "../../assets/foto1.jpg";
import Foto2 from "../../assets/foto2.jpg";
import Foto3 from "../../assets/foto3.jpg";
import Foto4 from "../../assets/foto4.jpg";
import Igreja1 from "../../assets/igreja1d.jpg";
import Igreja2 from "../../assets/igreja2d.jpg";
import { ArrowLeft } from "lucide-react";
import {
  Container,
  ImageContainer,
  DownloadButton,
  Image,
  EngravingLayout,
  Col,
  EngravingImage,
  EngravingDescription,
} from "./styles";
import Tags from "src/components/Tags";
import { useNavigate } from "react-router-dom";

const ItemDetails = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="flex-group">
        <a className="inner-link" onClick={() => navigate("/pesquisa/igrejas")}>
          <ArrowLeft size={20} /> Igrejas
        </a>
      </div>
      <h1 className="item-name">
        A Igreja de Santa Teresa de Jesus da Ordem Terceira do Carmo do Recife
      </h1>
      <p className="item-updater">
        Por <span className="black">Pesquisador</span> • Rafael Santos
      </p>
      <div className="item-content">
        <div className="img-container">
          <ImageContainer>
            <Image src={Igreja1} alt="" />
            <DownloadButton>Baixar</DownloadButton>
          </ImageContainer>
          <ImageContainer>
            <Image src={Igreja2} alt="" />
            <DownloadButton>Baixar</DownloadButton>
          </ImageContainer>
        </div>
        <div className="item-info">
          <div className="topic-wrapper">
            <h2 className="topic-title">Sobre esta Obra</h2>
            <p className="topic-text">
              A Ordem Terceira Carmelita do Recife foi oficialmente fundada a
              partir de uma carta patente de 27 de setembro de 1695, passando a
              funcionar dentro da Igreja de Nossa Senhora do Carmo pertencente
              aos irmãos carmelitas da Ordem Primeira Calçada de Nossa Senhora
              do Carmo. Entretanto, cerca de um ano depois os religiosos
              carmelitas doaram aos seus irmãos leigos uma “capela que se achava
              ainda em construção” e uma “grande porção de terras”. Essa doação
              possibilitou que os terceiros construíssem seu próprio templo, que
              veio a ser inaugurado no ano de 1710, sob a consagração feita à
              reformadora carmelita Santa Teresa d’Ávila.
            </p>
          </div>
          <div className="topic-wrapper">
            <h3 className="topic-title">Referências</h3>
            <ul className="reference-list">
              <li className="reference-item">
                <sup>1 </sup> HONOR, André Cabral. A pinacoteca dos irmãos
                terceiros carmelitas do Recife na Capitania de Pernambuco:
                revisitando a pintura de Manoel de Cláudio Francisco da
                Encarnação (séc. XIX). Territórios e Fronteiras (UFMT. Online),
                v. 10, n. 1, p. 179-200, 2017. Captado em:
                https://periodicoscientificos.ufmt.br/territoriosefronteiras/index.php/v03n02/article/view/522/pdf
                Acesso em: 15/04/2023.
              </li>
              <li className="reference-item">
                <sup>2 </sup> HONOR, André Cabral. Santa Teresa e os fundadores:
                iconologia da pintura de João de Deus e Sepúlveda na Igreja da
                Ordem Terceira Carmelita do Recife (Séc. XVIII). Tempo, v. 25,
                n. 3, p. 555-576, Niterói, set./dez. 2019. Captado em:
                http://www.scielo.br/pdf/tem/v25n3/1980-542X-tem-25-03-555.pdf
                Acesso em: 21/04/2022.
              </li>
              <li className="reference-item">
                <sup>3 </sup>
                HONOR, André Cabral. Livros, gravuras e pinturas na Igreja da
                Ordem Terceira Carmelita do Recife: apropriações e usos das
                imagens sacras na América portuguesa. Estudos Ibero-Americanos,
                v. 47, n. 2, Porto Alegre, p. 1-14, mai/ago 2021. Captado em:
                https://doi.org/10.15448/1980-864X.2021.2.35297 Acesso em:
                05/12/2022.
              </li>
              <li className="reference-item">
                <sup>4 </sup>
                HONOR, André Cabral. A miniatura na arte sacra tridentina no
                Império Português: os casos de Josefa de Óbidos e João de Deus e
                Sepúlveda. História (São Paulo), v. 41, p. 1-18, 2022. Captado
                em: https://doi.org/10.15448/1980-864X.2021.2.35297 Acesso em:
                05/12/2022.
              </li>
              <li className="reference-item">
                <sup>5 </sup>
                PIO, Fernando. Histórico da Igreja de Santa Thereza ou Igreja da
                Ordem Terceira de Nossa Senhora do Monte do Carmo da cidade do
                Recife. Recife: Jornal do Commercio, 1937. QUEIROZ, Rafael Lima
                Meireles de. A voz de Deus: o toque dos sinos como objeto de
                negociação entre os membros da Ordem Primeira e da Ordem
                Terceira do Carmo do Recife setecentista. Dissertação (Mestrado
                em História). 129 f. Universidade de Brasília, Brasília, 2021.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h2 className="topic-title">Obras da igreja</h2>
      <EngravingLayout>
        <Col onClick={() => navigate("/paineis-do-carmo/item/3")}>
          <EngravingImage src={Foto1} alt="" />
          <EngravingDescription>
            <p className="engraving-title">
              Visão: Santo Eduardo, rei da Inglaterra
            </p>
            <p className="engraving-author">Corredor de acesso à sacristia</p>
          </EngravingDescription>
        </Col>
        <Col>
          <EngravingImage src={Foto2} alt="" />
          <EngravingDescription>
            <p className="engraving-title">
              Visão: Santa Angela, princeza da Boemia{" "}
            </p>
            <p className="engraving-author">Corredor de acesso à sacristia </p>
          </EngravingDescription>
        </Col>
        <Col>
          <EngravingImage src={Foto3} alt="" />
          <EngravingDescription>
            <p className="engraving-title">
              Visão: Santa Izabel, rainha da Boemia{" "}
            </p>
            <p className="engraving-author">Corredor de acesso à sacristia </p>
          </EngravingDescription>
        </Col>
        <Col>
          <EngravingImage src={Foto4} alt="" />
          <EngravingDescription>
            <p className="engraving-title">São Henrique de Grei </p>
            <p className="engraving-author">Autor da Gravura</p>
          </EngravingDescription>
        </Col>
      </EngravingLayout>
    </Container>
  );
};

export default ItemDetails;
