import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "./styles";
import React, { useState } from "react";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faCirclePlus,
  faMinusCircle,
  faPlug,
  faPlugCirclePlus,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

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
  const [iconSize, setIconSize] = useState<SizeProp>("xs");

  const handleMouseEnter = () => {
    setIconSize("sm");
  };

  const handleMouseLeave = () => {
    setIconSize("xs");
  };

  const text = typeof children === "string" ? children : "";

  const truncatedText =
    text.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <Container
      onClick={() => setIsHovered(!isHovered)}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <p className={className + " text-truncate"}>
        <span className={`full-text ${isHovered ? "visible" : ""}`}>
          {text}
          <div>
            <FontAwesomeIcon
              size={iconSize}
              color="gray"
              icon={faMinusCircle}
            />
          </div>
        </span>
        <div>
          <span className={`truncated-text ${isHovered ? "hidden" : ""}`}>
            {truncatedText}
            <div>
              <FontAwesomeIcon
                color="gray"
                size={iconSize}
                icon={faPlusCircle}
              />
            </div>
          </span>
        </div>
      </p>
    </Container>
  );
};

export default TextTruncate;
