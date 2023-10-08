import temp from "../../assets/temp.png";
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

export const PaintingDescription = () => {
  return (
    <>
      <Container>
        <PaintingContainer>
          <TextContainer>
            <Description>
              <ChurchName>Test</ChurchName>
              <PaintingName>Pintura</PaintingName>
              <DescriptionText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus.
              </DescriptionText>
            </Description>

            <TagContainer>
              <Tag>Tag1</Tag>
              <Tag>Tag2</Tag>
              <Tag>Tag3</Tag>
            </TagContainer>
          </TextContainer>

          <ImageContainer>
            <PaintingImage src={temp} alt="Temporary church" />
          </ImageContainer>
        </PaintingContainer>
        <LineDivider />
      </Container>
    </>
  );
};

export default PaintingDescription;
