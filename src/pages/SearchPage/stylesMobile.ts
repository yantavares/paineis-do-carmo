import styled from "styled-components";

export const PaddingContainerMobile = styled.div`
  padding: 0 5%;
`;

export const SearchContainerMobile = styled.div`
  padding: 2% 5%;
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

export const SearchBarContainerMobile = styled.div`
  padding-top: 1rem;
  font-size: 1rem;
`;

export const SearchResultsContainerMobile = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 4rem 3.6rem;
  //align-items: center;
`;

export const SearchHeaderMobile = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  padding: 0;
  margin: 0;
`;

export const SearchResultMobile = styled.div`
  height: 100%;
  width: calc(20% - 2.92rem);
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    height: 22rem;
  }
`;
