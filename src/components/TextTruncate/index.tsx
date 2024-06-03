import { Container } from "./styles";
import React, { useEffect, useState } from "react";

interface TextTruncateProps {
  children: React.ReactNode;
  limit?: number;
  className?: string;
}

const TextTruncate: React.FC<TextTruncateProps> = ({
  children,
  limit = 45,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const text = typeof children === "string" ? children : "";

  const truncatedText =
    text.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <Container>
      <p
        className={className + " text-truncate"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={`full-text ${isHovered ? "visible" : ""}`}>
          {text}
        </span>
        <span className={`truncated-text ${isHovered ? "hidden" : ""}`}>
          {truncatedText}
        </span>
      </p>
    </Container>
  );
};

export default TextTruncate;
