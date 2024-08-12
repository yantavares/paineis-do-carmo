import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  transition: all 0.3s ease-in-out;
  cursor: text;

  .text-truncate {
    position: relative;
    overflow: hidden;
  }

  .full-text,
  .truncated-text {
    display: inline-block;
    z-index: 3;
  }

  .icon-truncate:hover {
    transition: all 0.1s ease-in-out;
    transform: scale(1.2);
  }

  .full-text.visible {
    opacity: 1;
    position: static;
  }

  .full-text {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.3s ease-in;
  }

  .truncated-text.hidden {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
  }

  .truncated-text {
    opacity: 1;
    position: static;
  }
`;
