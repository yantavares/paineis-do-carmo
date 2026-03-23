import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Track = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  flex: 1;
  min-width: 0;
  gap: 20px;
  padding: 10px 0;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
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
      left: 0px;
    }
    &.right {
      right: 0px;
    }
  }
`;

const Slide = styled.div`
  flex: 0 0 calc(33.333% - 13.33px);
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  
  @media (max-width: 900px) {
    flex: 0 0 calc(50% - 10px);
  }
  @media (max-width: 600px) {
    flex: 0 0 100%;
  }
`;

interface Props {
  children: React.ReactNode;
}

const ItemsCarousel = ({ children }: Props) => {
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
    // Set a timeout to check again after images load
    const timer = setTimeout(checkScroll, 500);
    return () => {
      if (current) current.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [children]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (trackRef.current) {
      const amount = trackRef.current.clientWidth * 0.8;
      trackRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <CarouselWrapper>
      <IconButton
        className="left"
        onClick={() => scrollByAmount("left")}
        disabled={!canScrollLeft}
      >
        <ChevronLeft size={24} />
      </IconButton>
      <Track ref={trackRef}>
        {React.Children.map(children, (child) => (
          <Slide>{child}</Slide>
        ))}
      </Track>
      <IconButton
        className="right"
        onClick={() => scrollByAmount("right")}
        disabled={!canScrollRight}
      >
        <ChevronRight size={24} />
      </IconButton>
    </CarouselWrapper>
  );
};

export default ItemsCarousel;

