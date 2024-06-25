import styled from "styled-components";
import colors from "src/utils/colors";

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;

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
    width: 600px;
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
    color: ${colors.gray};
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
`;
