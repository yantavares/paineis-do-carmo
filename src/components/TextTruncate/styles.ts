import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  .text-truncate {
  }

  .full-text,
  .truncated-text {
    display: inline-block;
  }

  .full-text.visible {
    opacity: 1;
    position: static;
  }

  .full-text {
    opacity: 0;
    position: absolute;
  }

  .truncated-text.hidden {
    opacity: 0;
    position: absolute;
  }

  .truncated-text {
    opacity: 1;
    position: static;
  }
`;
