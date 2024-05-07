import React from "react";
import Carousel1 from "../../assets/pintura1.jpeg";
import Carousel2 from "../../assets/pintura2.jpeg";

import { ArrowLeft } from "lucide-react";
import { Container } from "./styles";
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
      <h1 className="item-name">Nome da Obra</h1>
      <p className="item-updater">
        Por <span className="black">Pesquisador</span> • Rafael Santos
      </p>
      <div className="item-content">
        <div className="img-container">
          <img src={Carousel1} alt="" style={{ width: "440px" }} />
          <button style={{ width: "10rem" }}>Baixar</button>
        </div>
        <div className="item-info">
          <div className="topic-wrapper">
            <h2 className="topic-title">Sobre esta Obra</h2>
            <p className="topic-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              facilis amet exercitationem, soluta nesciunt ad voluptatibus id
              rem, aperiam perferendis beatae dolores tempora delectus ipsam?
              Modi consequatur aspernatur molestiae minima. <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum ut provident ipsa exercitationem nihil nemo alias neque
              eligendi dolorum amet necessitatibus sint mollitia quis, ullam
              pariatur corporis odio, ducimus reprehenderit.
            </p>
          </div>
          <div className="topic-wrapper">
            <h3 className="topic-title">Referências</h3>
            <ul className="reference-list">
              <li className="reference-item">
                <sup>1 </sup> Castro, Joseph. “Who Invented the Mirror?”
                Livescience, 28 March 2013.
              </li>
              <li className="reference-item">
                <sup>2 </sup> “Mirror.” Dallas Museum of Art,
                https://collections.dma.org/artwork/3288058.
              </li>
              <li className="reference-item">
                <sup>3 </sup> “Mirror with Jaguar or Coyote Mosaic.” Art
                Institute Chicago,
              </li>
              <li className="reference-item">
                <sup>4 </sup>{" "}
                https://www.livescience.com/34466-who-invented-mirror.html.
                Accessed 25 May 2022.
              </li>
            </ul>
          </div>
          <div className="topic-wrapper">
            <h2 className="topic-title">Ficha da Obra</h2>
            <div className="record-info">
              <p className="record-data">
                <strong>Título Atribuído:</strong> Teto da igreja São Francisco
                de Assis
              </p>
              <br />
              <p className="record-data">
                <strong>Artista:</strong> Manuel da Costa Ataíde
              </p>
              <br />
              <p className="record-data">
                <strong>Localização:</strong> Ouro Preto, MG
              </p>
              <br />
              <p className="record-data">
                <strong>Autoria das fotos:</strong> Rafael Santos
              </p>
              <br />
              <p className="record-data">
                <strong>Fonte Bibliográfica:</strong> www.bibliografia.com
              </p>
            </div>
          </div>
          <div className="topic-wrapper">
            <h2 className="tags-title">Tags</h2>
            <div className="tags-wrapper">
              <Tags tags={["Tag1", "Tag2"]} />
            </div>
          </div>
        </div>
      </div>
      <h2 className="topic-title">Gravuras</h2>
      <div className="engraving-layout">
        <div className="col">
          <img src={Carousel1} alt="" className="engraving-img" />
          <div className="engraving-description">
            <p className="engraving-title">Título da Gravura</p>
            <p className="engraving-author">Autor da Gravura</p>
          </div>
        </div>
        <div className="col">
          <img src={Carousel2} alt="" className="engraving-img" />
          <div className="engraving-description">
            <p className="engraving-title">Título da Gravura</p>
            <p className="engraving-author">Autor da Gravura</p>
          </div>
        </div>
        <div className="col">
          <img src={Carousel1} alt="" className="engraving-img" />
          <div className="engraving-description">
            <p className="engraving-title">Título da Gravura</p>
            <p className="engraving-author">Autor da Gravura</p>
          </div>
        </div>
        <div className="col">
          <img src={Carousel2} alt="" className="engraving-img" />
          <div className="engraving-description">
            <p className="engraving-title">Título da Gravura</p>
            <p className="engraving-author">Autor da Gravura</p>
          </div>
        </div>
        <div className="col">
          <img src={Carousel1} alt="" className="engraving-img" />
          <div className="engraving-description">
            <p className="engraving-title">Título da Gravura</p>
            <p className="engraving-author">Autor da Gravura</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ItemDetails;
