import colors from "src/utils/colors";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  min-height: 39.45vh;
  margin: 5rem auto 0;
  font-size: 160%;
  padding: 0 2rem;

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

  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex-group {
    margin-left: 1rem;
    display: flex;
    gap: 2.5rem;
    margin-bottom: 0;
    padding: 0;
  }

  .close-btn {
    padding: 0.5rem;
    margin: 0;
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

export const FormContainer = styled.div`
  padding: 1rem 1.5rem;
  min-width: 50rem;

  input,
  textarea {
    resize: none;
    width: 100%;
    color: #202020;
    font-weight: 500;
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    padding: 1rem;

    &:focus {
      outline: none;
      border-color: ${colors.mainColor};
    }

    &::placeholder {
      font-family: "Inter", sans-serif;
      font-size: 14px;
      color: #b0b0b0;
    }
  }

  button.secondary {
    background: #fff;
    color: ${colors.mainColor};
    border: 1px solid ${colors.mainColor};
    display: flex;
    align-items: center;
    margin-top: 1rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.95);
    }
  }

  button {
    background: ${colors.mainColor};
    color: #f5f5f5;
    border: none;
    display: flex;
    align-items: center;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(1.25);
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
