import styled from "styled-components";

export const FooterContainer = styled.div`
  margin-top: 2rem;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

export const FooterContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 10rem;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FooterLink = styled.a`
  cursor: pointer;
  font-weight: 500;
`;

export const HorizontalDivider = styled.div`
  height: 60%;
  border-right: 1px solid gray;
`;

export const FooterTitle = styled.h2`
  margin: 0;
  padding: 0;
`;
