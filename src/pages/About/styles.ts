import styled from "styled-components";
import colors from "src/utils/colors";

export const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0% 16%;
  padding-top: 4%;
`;

export const AboutText = styled.h3`
  text-align: justify;
  font-size: 2.2rem;
  font-weight: 800;
  padding: 0;
  padding-top: 1rem;
  line-height: 1.8;
  margin: 0;
  font-weight: 350;
`;

export const AboutSpan = styled.span`
  font-weight: bold;
  color: ${colors.green};
`;

export const HorizontalLine = styled.hr`
  border: 0.1rem solid ${colors.green};
  opacity: 0.4;
  width: 100%;
`;

export const AboutUsContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  background-color: ${colors.green};
  border-radius: 4rem;
  padding: 4%;
  color: ${colors.white};
`;

export const AboutUs = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
