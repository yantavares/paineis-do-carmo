import colors from "src/utils/colors";
import styled from "styled-components";

export const Container = styled.div`
  font-size: 160% !important;

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal-container {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 500px;
    width: 100%;
    position: relative;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }

  .modal-header h1 {
    font-size: 2rem;
    margin: 0;
  }

  .modal-header .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2rem;
  }

  .modal-content {
    padding: 20px 0;
    text-align: center;
  }

  .modal-content p {
    margin: 0;
    font-size: 1rem;
  }

  .modal-actions {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }

  .modal-actions .submit-btn {
    background-color: #dc3545;
    color: ${colors.mainColor};
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .modal-actions .submit-btn:hover {
    background-color: #c82333;
  }

  .modal-actions .cancel-btn {
    background-color: #6c757d;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .modal-actions .cancel-btn:hover {
    background-color: #5a6268;
  }
`;
