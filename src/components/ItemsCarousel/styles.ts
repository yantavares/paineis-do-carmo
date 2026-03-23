import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  padding: 0 2rem;
  
  .slick-list {
    margin: 0 -1rem;
  }
  
  .slick-slide > div {
    padding: 0 1rem;
    display: flex;
    justify-content: center;
  }
  
  .slick-prev:before,
  .slick-next:before {
    color: #000;
  }

  [data-theme="dark"] & {
    .slick-prev:before,
    .slick-next:before {
      color: #fff;
    }
    .slick-dots li button:before {
      color: #fff;
    }
  }
`;
