import { faChurch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tags from "src/components/Tags";
import TextTruncate from "src/components/TextTruncate";
import colors from "src/utils/colors";
import { Painting } from "src/utils/mockData";
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

const defaultPainting: Painting = {
  id: 0,
  title: "",
  images: [],
  dateOfCreation: 0,
  city: "",
  church: {
    id: 0,
    name: "",
    images: [],
  },
  state: "",
  tags: [],
};

const PaintingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Painting>(defaultPainting);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const downloadImage = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchPaintings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/paintings/${id}`
        );
        setData(response.data as Painting);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchPaintings();
  }, [id]);

  if (isLoading)
    return (
      <div
        style={{
          height: "80vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={100} style={{ color: colors.mainColor }} />
      </div>
    );

  return (
    <Container>
      <div className="flex-group">
        <a className="inner-link" onClick={() => navigate("/pesquisa/obras")}>
          <ArrowLeft size={20} /> Obras
        </a>
      </div>
      <h1 className="item-name">{data.title} </h1>
      <p className="item-updater" style={{ display: "flex", gap: "1rem" }}>
        <FontAwesomeIcon icon={faChurch} />
        Localizada em •
        <span
          onClick={() => navigate(`/item/churches/${data.church.id}`)}
          className="black hoverable"
        >
          {" "}
          {data.church.name}{" "}
        </span>{" "}
        <span
          className="black hoverable"
          onClick={() => navigate(`/pesquisa/igrejas/${data.church.state}`)}
        >
          • {data.church.state}
        </span>
      </p>
      <div className="item-content">
        <div className="img-container">
          {data.images &&
            data.images.map((image, index) => (
              <ImageContainer key={index}>
                <Image src={image.url} alt="" />
                <DownloadButton onClick={() => downloadImage(image.url)}>
                  Baixar
                </DownloadButton>
              </ImageContainer>
            ))}
        </div>
        <div className="item-info">
          <div className="topic-wrapper">
            <h2 className="topic-title">Sobre esta Obra</h2>
            <p className="topic-text">{data.description}</p>
          </div>
          <div className="topic-wrapper">
            {(data?.bibliographyReference?.length > 1 ||
              (data?.bibliographyReference?.length == 1 &&
                data.bibliographyReference[0] !== "")) && (
              <>
                <h3 className="topic-title">Referências</h3>
                <ul className="reference-list">
                  {data?.bibliographyReference &&
                    data?.bibliographyReference.map((reference, index) => {
                      if (reference && reference !== " ")
                        return (
                          <li key={index} className="reference-item">
                            <sup>{index + 1} </sup> {reference}
                          </li>
                        );
                    })}
                </ul>
              </>
            )}
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
                {data?.artisan || "N/A"}
              </p>
              <br />
              <p className="record-data">
                <strong>Local na Igreja:</strong> {data?.placement ?? "N/A"}
              </p>
              <br />
              <p className="record-data">
                <strong>Autoria das fotos: </strong>
                {data.images.map((image, index) =>
                  index > 0 ? (
                    <span key={index}>, {image?.photographer ?? "N/A"} </span>
                  ) : (
                    <span key={index}>{image?.photographer ?? "N/A"}</span>
                  )
                )}
              </p>
              <br />
              <p className="record-data">
                <strong>Fonte Historiográfica:</strong>{" "}
                {data?.bibliographySource ?? "N/A"}
              </p>
            </div>
          </div>
          <div className="topic-wrapper">
            <h2 className="tags-title">Tags</h2>
            <div className="tags-wrapper">
              <Tags tags={data.tags} />
            </div>
          </div>
        </div>
      </div>
      {data?.engravings?.length > 0 && (
        <>
          <h2 className="topic-title">Gravuras</h2>
          <EngravingLayout>
            {data.engravings.map((engraving, index) => (
              <Col key={index} style={{ cursor: "not-allowed" }}>
                <EngravingImage
                  src={engraving.url}
                  alt={engraving.name || "Engraving"}
                />
                <EngravingDescription>
                  <TextTruncate className="engraving-title">
                    {engraving.name}
                  </TextTruncate>
                </EngravingDescription>
              </Col>
            ))}
          </EngravingLayout>
        </>
      )}
    </Container>
  );
};

export default PaintingDetails;
