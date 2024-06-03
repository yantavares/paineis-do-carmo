import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;

  .text-truncate {
    display: inline-block;
    width: auto;
    position: relative;
    width: 100%;
  }

  .full-text,
  .truncated-text {
    width: 100%;
    left: 0;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
  }

  .full-text.visible {
    opacity: 1;
  }

  .full-text {
    opacity: 0;
  }

  .truncated-text.hidden {
    opacity: 0;
  }

  .truncated-text {
    opacity: 1;
  }
`;
