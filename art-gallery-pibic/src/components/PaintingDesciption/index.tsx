import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChurch, faPalette } from "@fortawesome/free-solid-svg-icons";
import { capitalizeStr } from "../../utils/stringOperations";
import {
  ChurchName,
  DescriptionText,
  PaintingContainer,
  PaintingName,
  ImageContainer,
  TextContainer,
  TagContainer,
  Tag,
  LineDivider,
  Container,
  Description,
  PaintingImage,
  PaintingAuthor,
  IconContainer,
} from "./styles";

interface PaintingDescriptionProps {
  church: string;
  title: string;
  desciption: string;
  tags: string[];
  image: string;
  author: string;
}

export const PaintingDescription = ({
  church,
  title,
  desciption,
  tags,
  image,
  author,
}: PaintingDescriptionProps) => {
  return (
    <>
      <Container>
        <PaintingContainer>
          <TextContainer>
            <Description>
              <IconContainer>
                <FontAwesomeIcon
                  icon={faChurch}
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
                <ChurchName>{capitalizeStr(church)}</ChurchName>
              </IconContainer>
              <PaintingName>{capitalizeStr(title)}</PaintingName>
              <IconContainer removeBorder>
                <FontAwesomeIcon
                  icon={faPalette}
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
                <PaintingAuthor>{capitalizeStr(author)}</PaintingAuthor>
              </IconContainer>
              <DescriptionText>{desciption}</DescriptionText>
            </Description>
            <TagContainer>
              {tags.map((tag: string, id: number) => (
                <Tag key={id}>{tag}</Tag>
              ))}
            </TagContainer>
          </TextContainer>
          <ImageContainer>
            <PaintingImage src={image} alt={title} />
          </ImageContainer>
        </PaintingContainer>
        <LineDivider />
      </Container>
    </>
  );
};

export default PaintingDescription;
