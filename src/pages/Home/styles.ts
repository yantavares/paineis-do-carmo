import styled from "styled-components";
import colors from "src/utils/colors";

export const PaddingContainer = styled.div`
  padding: 0 5%;
`;

export const CarouselContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

export const TopicTitle = styled.h2`
  font-size: 3rem;
  padding: 0;
  margin: 0;
`;

export const TopicSubTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${colors.lightGray};
  padding: 0;
  margin: 0;
`;

export const TopicsContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
  width: 100%;
  flex-direction: column;
`;

export const Topic = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const TopicOne = styled.div`
  margin-top: -2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const TopicHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopicBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 0 3.2rem;
  padding-top: 2rem;
  width: 70%;
`;

export const GreetingContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0;
`;

export const MainTextHeader = styled.h1`
  font-size: 6rem;
  line-height: 1;
  margin: 0;
  padding: 0;
`;

export const MainText = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${colors.lightGray};
  text-align: justify;
  margin: 0;
  line-height: 1.6;
  padding: 0;
`;
