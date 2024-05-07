import React from "react";
import G1 from "../../assets/g1.jpeg";
import G2 from "../../assets/g2.png";
import G3 from "../../assets/g3.jpg";
import Foto1 from "../../assets/teresa.jpg";
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
        <a className="inner-link" onClick={() => navigate("/pesquisa/obras")}>
          <ArrowLeft size={20} /> Obras
        </a>
      </div>
      <h1 className="item-name">A monja Teresa é protegida por Jesus </h1>
      <p className="item-updater">
        Por <span className="black">Pesquisador</span> • Rafael Santos
      </p>
      <div className="item-content">
        <div className="img-container">
          <ImageContainer>
            <Image src={Foto1} alt="" />
            <DownloadButton>Baixar</DownloadButton>
          </ImageContainer>
          {/* <ImageContainer>
            <Image src={Foto1} alt="" />
            <DownloadButton>Baixar</DownloadButton>
          </ImageContainer> */}
        </div>
        <div className="item-info">
          <div className="topic-wrapper">
            <h2 className="topic-title">Sobre esta Obra</h2>
            <p className="topic-text">
              CAPÍTULO 39 VERSÍCULO 17 – Vi-me, estando em oração, sozinha num
              grande campo, e em redor de mim muita gente de modos diversos que
              me cercava. Todos, me parece, tinham armas nas mãos para me
              agredir: uns, lanças; outros, espadas; outros, adagas e outros,
              estoques muito compridos; enfim, eu não podia sair por nenhum lado
              sem me pôr em perigo de morte, e só, sem ninguém que se achasse do
              meu lado. Estando meu espírito nesta aflição, que não sabia que
              fazer de mim, levantei os olhos ao Céu e vi Cristo, não no Céu,
              mas bem por cima de mim, no ar, e me estendia a mão e de ali mesmo
              me favorecia, de maneira que eu não temia toda aquela outra gente;
              nem eles, embora quisessem, me podiam fazer dano.
            </p>
          </div>
          <div className="topic-wrapper">
            <h3 className="topic-title">Referências</h3>
            <ul className="reference-list">
              <li className="reference-item">
                <sup>1 </sup> JESUS, Santa Teresa de. Livro da vida. São Paulo:
                Companhia das Letras/Penguin, 2010.
              </li>
              <li className="reference-item">
                <sup>2 </sup> La Vie de Ia séraphique Mère sainte Thérèse de
                Jesus, fondatrice dês Carmes Déchaussez & dês Carmelites
                Déchaussées, en figures & en vers François & Latins (Folha 209;
                Prancha 33) – Autor: Claudine Brunard.
              </li>
              <li className="reference-item">
                <sup>3 </sup>Vita effigiata della serafica vergine S. Teresa di
                Gesú fondatrice dell’Ordine Carmelitano Scalzo. (Prancha XXXVI).
                Autor: Arnold van Westerhout.
              </li>
              <li className="reference-item">
                <sup>4 </sup> Vita effigiata et essercizi affettiui di S. Teresa
                di giesu maestra di celeste dottrina per il giorno delia sacra
                comunione (Página 220; Prancha 45). Autor: Anônima.
              </li>
            </ul>
          </div>
          <div className="topic-wrapper">
            <h2 className="topic-title">Ficha da Obra</h2>
            <div className="record-info">
              <p className="record-data">
                <strong>Título Atribuído:</strong> A monja Teresa é protegida
                por Jesus
              </p>
              <br />
              <p className="record-data">
                <strong>Data:</strong> Século XVIII
              </p>
              <br />
              <p className="record-data">
                <strong>Artista:</strong>João de Deus e Sepúlveda
              </p>
              <br />
              <p className="record-data">
                <strong>Localização:</strong> Pintura Lateral
              </p>
              <br />
              <p className="record-data">
                <strong>Autoria das fotos:</strong> André Cabral Honor
              </p>
              <br />
              <p className="record-data">
                <strong>Fonte Bibliográfica:</strong> JESUS, Santa Teresa de.
                Livro da vida. São Paulo: Companhia das Letras/Penguin, 2010.
              </p>
            </div>
          </div>
          <div className="topic-wrapper">
            <h2 className="tags-title">Tags</h2>
            <div className="tags-wrapper">
              <Tags
                tags={[
                  "Teresa",
                  "Jesus",
                  "Pena",
                  "Anjo",
                  "Espada",
                  "Sepúlveda",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <h2 className="topic-title">Gravuras</h2>
      <EngravingLayout>
        <Col style={{ cursor: "not-allowed" }}>
          <EngravingImage src={G2} alt="" />
          <EngravingDescription>
            <p className="engraving-title">
              La Vie de Ia séraphique Mère sainte Thérèse de Jesus, fondatrice
              dês Carmes Déchaussez & dês Carmelites Déchaussées, en figures &
              en vers François & Latins (Folha 209; Prancha 33)
            </p>
            <p className="engraving-author">Claudine Brunard.</p>
          </EngravingDescription>
        </Col>
        <Col style={{ cursor: "not-allowed" }}>
          <EngravingImage src={G3} alt="" />
          <EngravingDescription>
            <p className="engraving-title">
              Vita effigiata della serafica vergine S. Teresa di Gesú fondatrice
              dell’Ordine Carmelitano Scalzo. (Prancha XXXVI).
            </p>
            <p className="engraving-author">Arnold van Westerhout.</p>
          </EngravingDescription>
        </Col>
        <Col style={{ cursor: "not-allowed" }}>
          <EngravingImage src={G1} alt="" />
          <EngravingDescription>
            <p className="engraving-title">
              Vita effigiata et essercizi affettiui di S. Teresa di giesu
              maestra di celeste dottrina per il giorno delia sacra comunione
              (Página 220; Prancha 45).
            </p>
            <p className="engraving-author">Autor anônimo</p>
          </EngravingDescription>
        </Col>
      </EngravingLayout>
    </Container>
  );
};

export default ItemDetails;
