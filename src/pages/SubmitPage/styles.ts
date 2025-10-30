import styled from "styled-components";
import colors from "src/utils/colors";

export const Container = styled.div`
  max-width: 1400px;
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
    border-radius: 2rem;
    width: 800px;
    margin: 0 auto;
    padding: 3rem;
    background-color: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
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
    resize: vertical;
    width: 100%;
    color: var(--color-text);
    font-weight: 500;
    background-color: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    padding: 1rem;
    margin: 0.5rem 0;

    &:focus {
      outline: none;
      border-color: ${colors.mainColor};
    }

    &::placeholder {
      font-family: "Inter", sans-serif;
      font-size: 14px;
      color: ${colors.lightGray};
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    border: 1px dashed var(--color-border);
    background-color: var(--color-surface-2);
    border-radius: 0.75rem;

    transition: all ease-in 0.1s;
    &:hover {
      cursor: pointer;
      background-color: var(--color-surface);
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
    background-color: ${colors.mainColor};

    &:hover {
      background-color: ${colors.darkMain};
    }
  }

  .close-btn {
    background-color: transparent;
    border: none;
    color: var(--color-text);
    padding: 0.25rem;

    &:hover {
      color: ${colors.white};
    }

    &:focus {
      outline: none;
    }
  }
`;
