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
    /* make this same border with a box shadow */
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

  /* Remove list item dots from the selected tags */
  .selected-tags-list {
    max-width: 400px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .selected-tags-list li {
    padding: 5px 10px;
    background-color: #e0e0e0;
    border-radius: 6px;
  }
`;
