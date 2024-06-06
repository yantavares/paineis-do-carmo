import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tags from "src/components/Tags";
import TextTruncate from "src/components/TextTruncate";
import { Church } from "src/utils/mockData";
import {
  Col,
  Container,
  DownloadButton,
  EngravingDescription,
  EngravingImage,
  EngravingLayout,
  Image,
  ImageContainer,
} from "../styles";

const defaultChurch: Church = {
  id: 0,
  name: "",
  images: [],
  street: "",
  city: "",
  state: "",
  tag: [],
};

const PaintingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Church>(defaultChurch);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/churches/${id}`
        );
        setData(response.data as Church);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPaintings();
  }, [id]);

  return (
    <Container>
      <div className="flex-group">
        <a className="inner-link" onClick={() => navigate("/pesquisa/igrejas")}>
          <ArrowLeft size={20} /> Igrejas
        </a>
      </div>
      <h1 className="item-name">{data.name} </h1>
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
              {data?.bibliographyReference &&
                data?.bibliographyReference
                  .split(";")
                  .map((reference, index) => (
                    <li key={index} className="reference-item">
                      <sup>{index + 1} </sup> {reference}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
      <h2 className="topic-title">Obras da Igreja</h2>
      <EngravingLayout>
        {data.paintings &&
          data.paintings.map((painting, index) => (
            <Col
              key={index}
              onClick={() => navigate(`/item/paintings/${painting.id}`)}
            >
              <EngravingImage src={painting?.images?.[0]?.url} alt="" />
              <EngravingDescription>
                <TextTruncate className="engraving-title">
                  {painting.title}
                </TextTruncate>
                <p style={{ fontSize: "1.6rem" }}>
                  {painting?.placement ?? "Sem localização"}
                </p>
              </EngravingDescription>
            </Col>
          ))}
      </EngravingLayout>
    </Container>
  );
};

export default PaintingDetails;
