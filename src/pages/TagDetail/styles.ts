import styled from "styled-components";

export const PaddingContainer = styled.div`
  padding: 0 5%;
`;

export const SearchContainer = styled.div`
  padding: 2% 5%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 3.4rem;
`;

export const SearchResultsContainer = styled.div`
  width: 100%;
  align-items: center;
  padding-left: 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0 3.6rem;
  align-items: center;
  scrollbar-width: thin;
  display: flex;
`;

export const SearchHeader = styled.h1`
  font-size: 5.6rem;
  font-weight: 800;
  padding: 0;
  margin: 0;
`;

export const SearchSubHeader = styled.h2`
  font-size: 4.8rem;
  font-weight: 500;
  padding: 0;
  padding-top: 3rem;
  margin: 0;
  margin-bottom: 3rem;
`;

export const SearchResult = styled.div`
  height: 30rem;
  img {
    height: 60%;
  }
`;
