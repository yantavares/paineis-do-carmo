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
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  gap: 6rem 3.6rem;
  align-items: center;
  height: 100%;
`;

export const SearchHeader = styled.h1`
  font-size: 5.6rem;
  font-weight: 800;
  padding: 0;
  margin: 0;
`;

export const SearchSubHeader = styled.h2`
  font-size: 4.8rem;
  font-weight: 800;
  padding: 0;
  padding-top: 3rem;
  margin: 0;
`;

export const SearchResult = styled.div`
  width: calc(20% - 2.92rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
`;
