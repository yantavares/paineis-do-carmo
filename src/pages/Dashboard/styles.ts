import styled from "styled-components";

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  min-height: 39.45vh;
  margin: 5rem auto 0;
  font-size: 160%;

  span {
    padding: 0.375rem;
    border-radius: 0.375rem;
  }

  .Published {
    color: #314c3c;
    background-color: #d3f9d8;
  }

  .Pending {
    color: #513c06;
    background-color: #fbf0db;
  }

  .flex-group {
    margin-left: 1rem;
    display: flex;
    gap: 2.5rem;
    margin-bottom: 0;
    padding: 0;
  }

  .flex-flow {
    display: flex;
    gap: 0.25rem;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  .table {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 1rem;
    padding: 1rem 2.5rem 1rem;
  }

  a {
    color: var(--clr-neutral-400);
    font-weight: var(--fw-medium);
    margin-bottom: 1.5rem;
    position: relative;
    transition: all 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      filter: brightness(1.25);
    }
  }

  a.active {
    color: var(--clr-neutral-100);

    &:after {
      content: "";
      display: block;
      width: 3rem;
      height: 0.125rem;
      border-radius: 1px;
      background-color: #319456;
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(1.625rem);
      top: 1.125rem;
    }
  }

  table {
    min-width: 100%;
    /* border-collapse: collapse; */
    /* border-spacing: 1rem 0.5rem; */
    margin: 0 auto;
  }

  th {
    width: 12rem;
    border-top: 1px solid var(--clr-outlines);
    padding-top: 1rem;
    text-align: left;
    color: var(--clr-neutral-400);
  }

  td {
    padding: 1.25rem 0;
    width: 10rem;
  }

  tr {
    border-bottom: 1px solid var(--clr-outlines);
  }

  tr:last-child {
    border-bottom: none;
  }

  img {
    width: 0.5rem;
    height: 0.5rem;
  }

  button {
    background: none;
    border: none;

    &:hover {
      filter: brightness(1.25);
    }
  }

  .rotate {
    transform: rotate(180deg);
  }

  .option-button {
    position: relative;
  }

  .dropdown-menu {
    position: absolute;
    top: 102%;
    left: 0;
    background: white;
    border: 1px solid var(--clr-outlines);
    border-radius: 0.375rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    z-index: 1;

    button {
      padding: 0.5rem 1rem;
      width: 100%;
      text-align: left;

      &:hover {
        background-color: var(--clr-neutral-100);
      }
    }
  }
`;

export const ExitContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;

export const ExitButton = styled.button`
  border: 1px solid #bbb;
  padding-right: 5rem;
  color: #777;
  padding: 0.5rem;
`;
