import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextTruncate from "src/components/TextTruncate";
import colors from "src/utils/colors";
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
import ImageCarousel from "src/components/ImageCarousel";
import {
  ColMobile,
  ContainerMobile,
  EngravingLayoutMobile,
} from "../stylesMobile";

const defaultChurch: Church = {
  id: 0,
  name: "",
  images: [],
  street: "",
  city: "",
  state: "",
  tags: [],
};

const PaintingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Church>(defaultChurch);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const [images, setImages] = useState([]);

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
          `${import.meta.env.VITE_API_URL}/api/churches/${id}`
        );
        setData(response.data as Church);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
      <ContainerMobile>
        <div className="flex-group">
          <a
            className="inner-link"
            onClick={() => navigate("/pesquisa/igrejas")}
          >
            <ArrowLeft size={20} /> Igrejas
          </a>
        </div>
        <h1 className="item-name">{data.name} </h1>
        <p className="item-updater" style={{ display: "flex", gap: "1rem" }}>
          <FontAwesomeIcon icon={faLocation} />
          Localizada em {data.city}
          <span
            onClick={() => navigate(`/pesquisa/igrejas/${data.state}`)}
            className="black hoverable"
          >
            {" "}
            • {data.state}{" "}
          </span>{" "}
        </p>
        <div className="item-content">
          <div style={{ width: "100%" }}>
            <ImageCarousel images={images} />
          </div>
          <div className="item-info">
            <div className="topic-wrapper">
              <h2 className="topic-title">Sobre esta Igreja</h2>
              <p className="topic-text">{data.description}</p>
            </div>
            <div className="topic-wrapper">
              {(data?.bibliographyReferences?.length > 1 ||
                (data?.bibliographyReferences?.length == 1 &&
                  data.bibliographyReferences[0] !== "")) && (
                <>
                  <h3 className="topic-title">Referências</h3>
                  <ul className="reference-list">
                    {data?.bibliographyReferences &&
                      data?.bibliographyReferences.map((reference, index) => {
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
          </div>
        </div>
        {data?.paintings?.length > 0 && (
          <>
            <h2 className="topic-title">Obras da Igreja</h2>
            <EngravingLayoutMobile>
              {data.paintings.map((painting, index) => (
                <ColMobile
                  key={index}
                  onClick={() => navigate(`/item/paintings/${painting.id}`)}
                >
                  <EngravingImage
                    src={painting?.images?.[0]?.url}
                    alt={painting.title || "Painting"}
                  />
                  <EngravingDescription>
                    <TextTruncate className="engraving-title">
                      {painting.title}
                    </TextTruncate>
                    <p style={{ fontSize: "1.6rem" }}>
                      {painting?.placement ?? "Sem localização"}
                    </p>
                  </EngravingDescription>
                </ColMobile>
              ))}
            </EngravingLayoutMobile>
          </>
        )}
      </ContainerMobile>
    );
  }

  return (
    <Container>
      <div className="flex-group">
        <a className="inner-link" onClick={() => navigate("/pesquisa/igrejas")}>
          <ArrowLeft size={20} /> Igrejas
        </a>
      </div>
      <h1 className="item-name">{data.name} </h1>
      <p className="item-updater" style={{ display: "flex", gap: "1rem" }}>
        <FontAwesomeIcon icon={faLocation} />
        Localizada em {data.city}
        <span
          onClick={() => navigate(`/pesquisa/igrejas/${data.state}`)}
          className="black hoverable"
        >
          {" "}
          • {data.state}{" "}
        </span>{" "}
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
            <h2 className="topic-title">Sobre esta Igreja</h2>
            <p className="topic-text">{data.description}</p>
          </div>
          <div className="topic-wrapper">
            {(data?.bibliographyReferences?.length > 1 ||
              (data?.bibliographyReferences?.length == 1 &&
                data.bibliographyReferences[0] !== "")) && (
              <>
                <h3 className="topic-title">Referências</h3>
                <ul className="reference-list">
                  {data?.bibliographyReferences &&
                    data?.bibliographyReferences.map((reference, index) => {
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
        </div>
      </div>
      {data?.paintings?.length > 0 && (
        <>
          <h2 className="topic-title">Obras da Igreja</h2>
          <EngravingLayout>
            {data.paintings.map((painting, index) => (
              <Col
                key={index}
                onClick={() => navigate(`/item/paintings/${painting.id}`)}
              >
                <EngravingImage
                  src={painting?.images?.[0]?.url}
                  alt={painting.title || "Painting"}
                />
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
        </>
      )}
    </Container>
  );
};

export default PaintingDetails;
