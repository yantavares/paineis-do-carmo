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
    color: #4c4c4c;
    background-color: #f2f2f2;
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

    border-collapse: separate;
    border-spacing: 0;
    column-gap: 24px;
  }

  td:first-child {
    min-width: 200px;
    padding-right: 40px;
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
    margin-right: 1rem;
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

    &:hover {
      background-color: #c1c1c1;
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

  table {
    border-spacing: 10px;
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

export const ChurchForm = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    padding: 0;
    margin: 0;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }

  .flex-group {
    display: flex;
    justify-content: space-between;
  }

  .form-container {
    width: 800px;
    margin: 0 auto;
    padding: 2rem 4rem;
    background-color: #fff;
  }

  .input-label {
    font-weight: 500;
    margin: 0;
  }

  .label-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input,
  textarea,
  select {
    resize: none;
    width: 100%;
    color: #202020;
    font-weight: 500;
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    padding: 1rem;
    margin: 0.5rem 0;

    &:focus {
      outline: none;
      border-color: #588157;
    }

    &::placeholder {
      font-family: "Inter", sans-serif;
      font-size: 14px;
      color: #b0b0b0;
    }
  }

  .submit-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .submit-description {
    font-weight: 500;
    font-size: 1.44rem;
    color: #202020;
    margin-bottom: 2rem;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  input[type="file"] {
    padding: 1rem;
  }

  .file-input-wrapper {
    /* do the custom file input here */
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    border: 1px dashed #e0e0e0;
    background-color: #f5f5f5;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;

    transition: all ease-in 0.1s;
    &:hover {
      cursor: pointer;
      background-color: #f2f2f2;
    }
  }

  p {
    margin: 0;
  }

  input[type="file"] {
    display: none;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .flex-layout {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .preview-image {
    min-height: 200px;
    min-width: 200px;
    max-width: 200px;
  }

  .form-fields-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .submit-btn {
    color: #fff;
    margin-top: 2rem;
    background-color: #588157;

    &:hover {
      background-color: #476b4f;
    }
  }

  .close-btn {
    background-color: transparent;
    border: none;
    color: #202020;
    padding: 0.25rem;

    &:hover {
      color: #000;
    }

    &:focus {
      outline: none;
    }
  }

  .file-input-wrapper {
    /* do the custom file input here */
    display: flex;
    margin-bottom: 1rem;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    border: 1px dashed #e0e0e0;
    background-color: #f5f5f5;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;

    transition: all ease-in 0.1s;
    &:hover {
      cursor: pointer;
      background-color: #f2f2f2;
    }
  }

  p {
    margin: 0;
  }

  input[type="file"] {
    display: none;
  }
`;
