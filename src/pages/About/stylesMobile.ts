import styled from "styled-components";
import colors from "src/utils/colors";

export const PaddingContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4%;
`;

export const AboutTextMobile = styled.h3`
  text-align: justify;
  font-size: 2rem;
  font-weight: 800;
  padding: 0;
  padding-top: 1rem;
  line-height: 1.8;
  margin: 0;
  font-weight: 350;
`;

export const AboutSpan = styled.span`
  font-weight: bold;
  color: ${colors.mainColor};
`;

export const HorizontalLine = styled.hr`
  border: 0.1rem solid ${colors.mainColor};
  opacity: 0.4;
  width: 100%;
`;

export const AboutUsContainerMobile = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  background-color: ${colors.darkMain};
  opacity: 0.9;
  border-radius: 4rem;
  padding: 8%;
  gap: 4rem;
  color: ${colors.white};
`;

export const AboutUsMobile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AboutUsHeader = styled.h3`
  font-size: 2.4rem;
  font-weight: 800;
  padding: 0;
  padding-top: 1rem;
  margin: 0;
`;

export const AboutUsText = styled.h3`
  font-size: 1.7rem;
  font-weight: 350;
  padding: 0;
  padding-top: 1rem;
  margin: 0;
`;

export const Us = styled.a`
  color: ${colors.white};
  transition: all 0.3s;
`;
