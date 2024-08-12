import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #e0e0e0;

  h3,
  p {
    padding: 0;
    margin: 0;
  }

  min-width: 360px;
  border-radius: 2rem;
  background-color: #fff;
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
    color: #343a40;
    background-color: #fff;
    border-radius: 1rem;
    padding: 1rem;
    width: 100%;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: #e0e0e0;
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
    background-color: #588157;
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
    color: #343a40;
    font-weight: 500;
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    padding: 1rem;
    margin: 0.5rem 0;
    width: 100%;

    transition: all ease-in 0.2s;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }

  .register-cta {
    margin-top: -0.5rem;
    font-size: 1.2rem;
    color: #588157;
    text-align: center;
  }
`;

export const Content = styled.div``;
