import styled from "styled-components";

export const OptionButtonContainer = styled.div`
  position: relative;
  font-size: 160%;

  .option-button {
    position: relative;
    width: 24px;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .dropdown-menu button {
    display: block;
    width: 100%;
    padding: 8px 16px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
  }

  .dropdown-menu button:hover {
    background-color: #f5f5f5;
  }

  /* .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    button {
      display: block;
      width: 100%;
      padding: 8px 16px;
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  } */
`;
