import colors from "src/utils/colors";
import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid var(--color-border);

  h3,
  p {
    padding: 0;
    margin: 0;
  }

  min-width: 360px;
  border-radius: 2rem;
  background-color: var(--color-surface);
  color: var(--color-text);
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  padding-inline: 3rem;
  align-items: center;

  .login-description {
    text-align: center;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .google-btn {
    color: var(--color-text);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: 1rem;
    width: 100%;

    &:hover {
      background-color: var(--color-surface-2);
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: var(--color-border);
    margin: 1rem 0;
  }

  .google-btn img {
    width: 1.5rem;
    margin-right: 1rem;
  }

  .flex-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .login-btn {
    color: #fff;
    background-color: ${colors.mainColor};
    border-radius: 1rem;
    padding: 1rem;
    width: 100%;
  }

  .label-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    color: var(--color-text);
    font-weight: 500;
    background-color: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    padding: 1rem;
    margin: 0.5rem 0;
    width: 100%;
    font-size: 16px;

    transition: all ease-in 0.2s;

    &:focus {
      outline: none;
      background-color: var(--color-surface);
      border-color: ${colors.mainColor};
    }
  }

  .register-cta {
    margin-top: -0.5rem;
    font-size: 1.2rem;
    text-align: center;
    font-size: 14px;
  }
`;

export const Content = styled.div``;
