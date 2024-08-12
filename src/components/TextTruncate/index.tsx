import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "./styles";
import React, { useState, useMemo } from "react";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface TextTruncateProps {
  children: React.ReactNode;
  limit?: number;
  className?: string;
}

const TextTruncate: React.FC<TextTruncateProps> = ({
  children,
  limit = 40,
  className,
}) => {
  const [shouldOpen, setShouldOpen] = useState(false);

  const text = useMemo(
    () => (typeof children === "string" ? children : ""),
    [children]
  );

  const truncatedText = useMemo(
    () => (text.length > limit ? `${text.substring(0, limit)}...` : text),
    [text, limit]
  );

  const shouldTruncate = text.length > limit;

  const handleClick = () => setShouldOpen((prev) => !prev);

  return (
    <Container>
      <p className={`${className} text-truncate`}>
        {shouldTruncate ? (
          <>
            <span className={`full-text ${shouldOpen ? "visible" : "hidden"}`}>
              {text}
            </span>
            <span
              className={`truncated-text ${shouldOpen ? "hidden" : "visible"}`}
            >
              {truncatedText}
            </span>
          </>
        ) : (
          <span className="full-text visible">{text}</span>
        )}
      </p>
      {shouldTruncate && (
        <div
          onClick={handleClick}
          className="icon-truncate"
          style={{ cursor: "pointer", padding: "0.3rem" }}
        >
          <FontAwesomeIcon
            size="lg"
            color="gray"
            icon={shouldOpen ? faMinusCircle : faPlusCircle}
          />
        </div>
      )}
    </Container>
  );
};

export default TextTruncate;
