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
import ImageCarousel from "src/components/ImageCarousel";
import {
  ColMobile,
  ContainerMobile,
  EngravingLayoutMobile,
} from "../stylesMobile";
import Modal from "src/components/Modal";

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
  const [images, setImages] = useState([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 860);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    if (data?.images) {
      let images = data.images?.map((image) => image.url);
      if (images.length > 0) {
        setImages(images);
      }
    }
  }, [data]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEngraving, setSelectedEngraving] = useState<{
    url: string;
    name?: string;
    createdBy?: string;
  } | null>(null);

  const openModal = (engraving: {
    url: string;
    name?: string;
    createdBy?: string;
  }) => {
    setSelectedEngraving(engraving);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEngraving(null);
  };

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

  if (isMobile) {
    return (
      <>
        <ContainerMobile>
          <div className="flex-group">
            <a
              className="inner-link"
              onClick={() => navigate("/pesquisa/obras")}
            >
              <ArrowLeft size={20} /> Obras
            </a>
          </div>
          <h1 className="item-name">{data.title} </h1>
          <p className="item-updater">
            <FontAwesomeIcon style={{ paddingRight: "1rem" }} icon={faChurch} />
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
              <div style={{ width: "100%" }}>
                <ImageCarousel images={images} />
              </div>
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
                {(data?.bibliographySource?.length > 1 ||
                  (data?.bibliographySource?.length == 1 &&
                    data.bibliographySource[0] !== "")) && (
                  <>
                    <h3 className="topic-title">Fontes Historiográficas</h3>
                    <ul className="reference-list">
                      {data?.bibliographySource &&
                        data?.bibliographySource?.map((reference, index) => {
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
                        <span key={index}>
                          , {image?.photographer ?? "N/A"}{" "}
                        </span>
                      ) : (
                        <span key={index}>{image?.photographer ?? "N/A"}</span>
                      )
                    )}
                  </p>
                  <br />
                  {/* <p className="record-data">
                <strong>Fonte Historiográfica:</strong>{" "}
                {data?.bibliographySource?.[0]
                  ? data?.bibliographySource?.[0]
                  : "N/A"}
              </p> */}
                </div>
              </div>
              {data.tags.length > 0 && (
                <div className="topic-wrapper">
                  <h2 className="tags-title">Tags</h2>
                  <div className="tags-wrapper">
                    <Tags tags={data.tags} />
                  </div>
                </div>
              )}
            </div>
          </div>
          {data?.engravings?.length ? (
            <>
              <h2 className="topic-title">Gravuras</h2>
              <EngravingLayoutMobile>
                {data.engravings.map((engraving, idx) => (
                  <ColMobile
                    key={idx}
                    onClick={() => openModal(engraving)}
                    style={{ cursor: "pointer" }}
                  >
                    <EngravingImage
                      src={engraving.url}
                      alt={engraving.name || "Engraving"}
                    />
                    <EngravingDescription>
                      <TextTruncate className="engraving-title">
                        {engraving.name}
                      </TextTruncate>
                      <p style={{ fontSize: "1.6rem" }}>
                        {engraving?.createdBy ?? "Autor desconhecido"}
                      </p>
                    </EngravingDescription>
                  </ColMobile>
                ))}
              </EngravingLayoutMobile>
            </>
          ) : null}
        </ContainerMobile>

        <Modal isOpen={isModalOpen} onClose={closeModal} shouldLock={false}>
          {selectedEngraving && (
            <figure style={{ textAlign: "center" }}>
              <img
                src={selectedEngraving.url}
                alt={selectedEngraving.name}
                style={{ maxWidth: "70%", borderRadius: "0.5rem" }}
              />
              <figcaption style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "2.2rem", fontWeight: 600 }}>
                  {selectedEngraving.name}
                </h3>
                <p style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
                  {selectedEngraving.createdBy ?? "Autor desconhecido"}
                </p>
                {data.images[0] && (
                  <>
                    <p style={{ fontSize: "1.4rem", marginTop: "2rem" }}>
                      Obra de referência
                    </p>
                    <img
                      src={data.images[0].url}
                      alt={data.title}
                      style={{
                        maxWidth: "70%",
                        marginTop: "1rem",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </>
                )}
              </figcaption>
            </figure>
          )}
        </Modal>
      </>
    );
  }

  return (
    <>
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
              {(data?.bibliographySource?.length > 1 ||
                (data?.bibliographySource?.length == 1 &&
                  data.bibliographySource[0] !== "")) && (
                <>
                  <h3 className="topic-title">Fontes Historiográficas</h3>
                  <ul className="reference-list">
                    {data?.bibliographySource &&
                      data?.bibliographySource?.map((reference, index) => {
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
                {/* <p className="record-data">
                <strong>Fonte Historiográfica:</strong>{" "}
                {data?.bibliographySource?.[0]
                  ? data?.bibliographySource?.[0]
                  : "N/A"}
              </p> */}
              </div>
            </div>
            {data.tags.length > 0 && (
              <div className="topic-wrapper">
                <h2 className="tags-title">Tags</h2>
                <div className="tags-wrapper">
                  <Tags tags={data.tags} />
                </div>
              </div>
            )}
          </div>
        </div>
        {data?.engravings?.length ? (
          <>
            <h2 className="topic-title">Gravuras</h2>
            <EngravingLayoutMobile>
              {data.engravings.map((engraving, idx) => (
                <ColMobile
                  key={idx}
                  onClick={() => openModal(engraving)}
                  style={{ cursor: "pointer" }}
                >
                  <EngravingImage
                    src={engraving.url}
                    alt={engraving.name || "Engraving"}
                  />
                  <EngravingDescription>
                    <TextTruncate className="engraving-title">
                      {engraving.name}
                    </TextTruncate>
                    <p style={{ fontSize: "1.6rem" }}>
                      {engraving?.createdBy ?? "Autor desconhecido"}
                    </p>
                  </EngravingDescription>
                </ColMobile>
              ))}
            </EngravingLayoutMobile>
          </>
        ) : null}
      </Container>

      <Modal isOpen={isModalOpen} onClose={closeModal} shouldLock={false}>
        {selectedEngraving && (
          <figure style={{ textAlign: "center" }}>
            <img
              src={selectedEngraving.url}
              alt={selectedEngraving.name}
              style={{ maxHeight: "40rem", borderRadius: "0.5rem" }}
            />
            <figcaption style={{ marginTop: "2rem" }}>
              <h3 style={{ fontSize: "2.2rem", fontWeight: 600 }}>
                {selectedEngraving.name}
              </h3>
              <p style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
                {selectedEngraving.createdBy ?? "Autor desconhecido"}
              </p>
              {data.images[0] && (
                <>
                  <p style={{ fontSize: "1.4rem", marginTop: "2rem" }}>
                    Obra de referência
                  </p>
                  <img
                    src={data.images[0].url}
                    alt={data.title}
                    style={{
                      maxHeight: "40rem",
                      marginTop: "1rem",
                      borderRadius: "0.5rem",
                    }}
                  />
                </>
              )}
            </figcaption>
          </figure>
        )}
      </Modal>
    </>
  );
};

export default PaintingDetails;
