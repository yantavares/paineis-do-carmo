import styled from "styled-components";
import colors from "src/utils/colors";

export const PaddingContainerMobile = styled.div`
  padding: 0 5%;
`;

export const CarouselContainerMobile = styled.div`
  width: 100%;
  margin: 5rem 0;
`;

export const TopicTitleMobile = styled.h2`
  font-size: 4.8rem;
  padding: 0;
  margin: 0;
`;

export const TopicSubTitleMobile = styled.p`
  font-size: 2.6rem;
  font-weight: 600;
  color: ${colors.lightGray};
  padding: 0;
  margin: 0;
`;

export const TopicsContainerMobile = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
  width: 100%;
  flex-direction: column;
`;

export const TopicMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
`;

export const TopicOneMobile = styled.div`
  margin-top: -2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
`;

export const TopicHeaderMobile = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopicBodyMobile = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainTextContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 0 3.2rem;
  padding-top: 1rem;
  align-content: center;
  text-align: center;
`;

export const GreetingContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  padding: 1rem 0;
`;

export const MainTextHeaderMobile = styled.h1`
  font-size: 4rem;
  line-height: 1;
  margin: 0;
  padding: 0;
`;

export const MainTextMobile = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${colors.lightGray};
  text-align: justify;
  margin: 0;
  line-height: 1.6;
  padding: 0;
`;
