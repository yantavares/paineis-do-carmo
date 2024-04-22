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
  display: flex;
  flex-wrap: wrap;
  gap: 9.2rem 3.6rem;
  align-items: center;
`;

export const SearchHeader = styled.h1`
  font-size: 5.6rem;
  font-weight: 800;
  padding: 0;
  padding-top: 1rem;
  margin: 0;
`;

export const SearchResult = styled.div`
  height: 22rem;
  width: calc(20% - 2.92rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
`;
