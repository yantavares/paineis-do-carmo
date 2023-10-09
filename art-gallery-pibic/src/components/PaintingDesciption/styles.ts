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

export const ChurchName = styled.h2`
  border: 1px solid white;
  border-radius: 2rem;
  width: max-content;
  padding: 0 1rem;
  margin: 0;
`;

export const PaintingName = styled.h1`
  margin: 0;
  line-height: 1.2;
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

export const Description = styled.p`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: justify;
`;

export const PaintingImage = styled.img`
  width: 100%;
  border-radius: 2rem;
`;
