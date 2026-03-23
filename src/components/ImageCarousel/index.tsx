import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";

// Exporting DownloadButton so existing code doesn't break
export const DownloadButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Track = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  flex: 0 1 auto;
  min-width: 0;
  gap: 2rem;
  padding: 1rem 0;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const Slide = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  
  @media (max-width: 860px) {
    flex: 0 0 100%;
    scroll-snap-align: center;
  }
`;

const ImageContainerStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 100%;
  
  img {
    max-width: 80vw;
    max-height: 44rem;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 1rem;
    transition: filter 0.3s ease;
  }
  
  @media (max-width: 860px) {
     width: 100%;
     img { max-width: 100%; }
  }
  
  &:hover {
    img {
      filter: brightness(0.7);
    }
    button {
      opacity: 1;
    }
  }
`;

const IconButton = styled.button`
  flex-shrink: 0;
  z-index: 10;
  
  background: #2a2a2a;
  color: #fff;
  border: 1px solid #444;
  
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 10px;

  &:hover {
    background: #3a3a3a;
    transform: scale(1.1);
  }

  [data-theme="dark"] & {
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background: #e0e0e0;
    }
  }

  &:disabled {
    opacity: 0;
    pointer-events: none;
  }

  @media (max-width: 860px) {
    position: absolute;
    margin: 0;
    
    background: rgba(0, 0, 0, 0.8) !important;
    color: #fff !important;
    border: 1px solid #333;
    
    [data-theme="dark"] & {
      background: rgba(255, 255, 255, 0.9) !important;
      color: #000 !important;
      border: none;
    }
    
    &.left {
      left: 10px;
    }
    &.right {
      right: 10px;
    }
  }
`;

interface Props {
  images: string[];
  showDownload?: boolean;
  onDownload?: (url: string) => void;
}

const ImageCarousel = ({ images, showDownload, onDownload }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = trackRef.current;
    if (current) {
      current.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    const timer = setTimeout(checkScroll, 500);
    return () => {
      if (current) current.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [images]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (trackRef.current) {
      const amount = trackRef.current.clientWidth;
      trackRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <CarouselWrapper>
      {images.length > 1 && (
        <IconButton
          className="left"
          onClick={() => scrollByAmount("left")}
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={24} />
        </IconButton>
      )}
      <Track ref={trackRef}>
        {images.map((img, index) => (
          <Slide key={index}>
            <ImageContainerStyled>
              <img src={img} alt="" />
              {showDownload && onDownload && (
                <DownloadButton onClick={() => onDownload(img)}>
                  Baixar
                </DownloadButton>
              )}
            </ImageContainerStyled>
          </Slide>
        ))}
      </Track>
      {images.length > 1 && (
        <IconButton
          className="right"
          onClick={() => scrollByAmount("right")}
          disabled={!canScrollRight}
        >
          <ChevronRight size={24} />
        </IconButton>
      )}
    </CarouselWrapper>
  );
};

export default ImageCarousel;
