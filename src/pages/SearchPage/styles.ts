import styled from "styled-components";

export const PaddingContainer = styled.div`
  padding: 0 5%;
`;

export const SearchContainer = styled.div`
  padding: 2% 5%;
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
`;

export const SearchBarContainer = styled.div`
  padding-top: 1rem;
`;

export const SearchResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  gap: 2rem;
`;

export const GridCol = styled.div`
  width: 100%;
`;

export const ColItem = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

export const SearchHeader = styled.h1`
  font-size: 5.6rem;
  font-weight: 800;
  padding: 0;
  padding-top: 1rem;
  margin: 0;
`;
