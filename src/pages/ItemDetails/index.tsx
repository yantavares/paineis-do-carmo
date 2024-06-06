import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import TextTruncate from "src/components/TextTruncate";
import { Painting } from "src/utils/mockData";
import axios from "axios";

const defaultPainting: Painting = {
  id: 0,
  title: "",
  images: [],
  dateOfCreation: 0,
  city: "",
  state: "",
  tag: [],
};

const ItemDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Painting>(defaultPainting);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/paintings/${id}`
        );
        setData(response.data as Painting);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPaintings();
  }, [id]);

  console.log(data);

  return (
    <Container>
      <div className="flex-group">
        <a className="inner-link" onClick={() => navigate("/pesquisa/obras")}>
          <ArrowLeft size={20} /> Obras
        </a>
      </div>
      <h1 className="item-name">{data.title} </h1>
      <p className="item-updater">
        Por <span className="black">Pesquisador</span> • Rafael Santos
      </p>
      <div className="item-content">
        <div className="img-container">
          {data.images &&
            data.images.map((image, index) => (
              <ImageContainer key={index}>
                <Image src={image.url} alt="" />
                <DownloadButton>Baixar</DownloadButton>
              </ImageContainer>
            ))}
        </div>
        <div className="item-info">
          <div className="topic-wrapper">
            <h2 className="topic-title">Sobre esta Obra</h2>
            <p className="topic-text">{data.description}</p>
          </div>
          <div className="topic-wrapper">
            <h3 className="topic-title">Referências</h3>
            <ul className="reference-list">
              <li className="reference-item">
                <sup>1 </sup> {data.bibliographyReference}
              </li>
            </ul>
          </div>
          <div className="topic-wrapper">
            <h2 className="topic-title">Ficha da Obra</h2>
            <div className="record-info">
              <p className="record-data">
                <strong>Título Atribuído:</strong> {data.title}
              </p>
              <br />
              <p className="record-data">
                <strong>Data:</strong> {data.dateOfCreation}
              </p>
              <br />
              <p className="record-data">
                <strong>Artista: </strong>
                {data.artisan &&
                  data.artisan.map((artisan, index) =>
                    index > 0 ? (
                      <span key={index}>, {artisan.name}</span>
                    ) : (
                      <span key={index}>{artisan.name}</span>
                    )
                  )}
              </p>
              <br />
              <p className="record-data">
                <strong>Local na Igreja:</strong> Pintura Lateral
              </p>
              <br />
              <p className="record-data">
                <strong>Autoria das fotos: </strong>
                {data.images.map((image, index) =>
                  index > 0 ? (
                    <span key={index}>, {image.photographer} </span>
                  ) : (
                    <span key={index}>{image.photographer}</span>
                  )
                )}
              </p>
              <br />
              <p className="record-data">
                <strong>Fonte Bibliográfica:</strong> {data.bibliographySource}
              </p>
            </div>
          </div>
          <div className="topic-wrapper">
            <h2 className="tags-title">Tags</h2>
            <div className="tags-wrapper">
              <Tags tags={data.tag} />
            </div>
          </div>
        </div>
      </div>
      <h2 className="topic-title">Gravuras</h2>
      <EngravingLayout>
        {data.engravings &&
          data.engravings.map((engraving, index) => (
            <Col key={index}>
              <EngravingImage src={engraving.url} alt="" />
              <EngravingDescription>
                <TextTruncate className="engraving-title">
                  {engraving.name}
                </TextTruncate>
              </EngravingDescription>
            </Col>
          ))}
      </EngravingLayout>
    </Container>
  );
};

export default ItemDetails;
