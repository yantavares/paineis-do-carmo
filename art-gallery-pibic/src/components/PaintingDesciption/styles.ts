import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 2rem;
`;

export const PaintingContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
`;

interface IconContainerProps {
  removeBorder?: boolean;
}

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: ${(props) => (props.removeBorder ? "none" : "1px solid white")};
  border-radius: 2rem;
  width: max-content;
  padding: 0 2%;
`;

export const ChurchName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.5;
`;

export const PaintingName = styled.h1`
  margin: 0;
  line-height: 1.2;
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

export const PaintingAuthor = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

export const DescriptionText = styled.p`
  margin: 0;
`;

export const ImageContainer = styled.div`
  width: 50%;
`;

export const TagContainer = styled.div`
  justify-self: flex-end;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Tag = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background-color: #000000;
  color: white;
`;

export const LineDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(233, 236, 239, 0.5);
  margin: 2rem 0;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: justify;
`;

export const PaintingImage = styled.img`
  max-width: 100%;
  border-radius: 2rem;
  max-height: 45rem;
`;
