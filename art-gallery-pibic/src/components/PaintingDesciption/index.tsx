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
} from "./styles";

interface PaintingDescriptionProps {
  church: string;
  title: string;
  desciption: string;
  tags: string[];
  image: string;
}

export const PaintingDescription = ({
  church,
  title,
  desciption,
  tags,
  image,
}: PaintingDescriptionProps) => {
  return (
    <>
      <Container>
        <PaintingContainer>
          <TextContainer>
            <Description>
              <ChurchName>{capitalizeStr(church)}</ChurchName>
              <PaintingName>{capitalizeStr(title)}</PaintingName>
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
