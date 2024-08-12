import styled from "styled-components";

export const Container = styled.div`
  input {
    width: 100%;
    color: #343a40;
    font-weight: 500;
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    padding: 1rem;
    margin: 0.5rem 0;
    transition: all ease-in 0.2s;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }

  .suggestions-container {
    position: relative;
  }

  .suggestions-list {
    position: absolute;
    z-index: 2;
    width: 100%;
    overflow-y: auto;
    background-color: #fff;
    padding: 0;
    margin: 0;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    border-radius: 0.75rem;
  }

  .suggestion-item {
    padding: 10px;
    cursor: pointer;
  }

  .suggestion-item--highlighted {
    background-color: #ddd;
    border-radius: 0.75rem;
  }

  .selected-tags-list {
    max-width: 400px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .selected-tags-list li {
    font-size: 1.5rem;
    position: relative;
    padding: 5px 10px;
    background-color: #e0e0e0;
    border-radius: 20px;
    cursor: pointer;
  }

  .selected-tags-list li:hover {
    padding-right: 25px;
  }

  .selected-tags-list li:hover::after {
    content: "x";
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: #dc3545;
    color: white;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
