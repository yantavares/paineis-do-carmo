import styled from "styled-components";
import colors from "src/utils/colors";

export const Container = styled.div`
  padding: 4rem 0;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 30.5vh;
  overflow-x: hidden;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    padding: 0;
    margin: 0;
    font: inherit;
  }

  .flex-group {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .inner-link {
    color: #343a40;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.6rem;
    font-weight: 500;
    cursor: pointer;
  }

  .item-name {
    font-size: 3.6rem;
    font-weight: 600;
    margin: 0;
  }

  .item-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 680px;
    margin: 0 auto;
  }

  .img-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 0 0 2rem;
  }

  .item-updater {
    color: #707272;
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0 0 2rem;
    margin-bottom: 4rem;
  }

  .black {
    color: #000;
  }

  .hoverable {
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      color: ${colors.green};
    }
  }

  .description {
    display: flex;
    flex-direction: column;
  }

  .topic-wrapper {
    margin: 0 0 2rem;
  }

  .topic-title {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 1rem;
    padding: 2rem 0;
  }

  .topic-text {
    color: #1b1d1d;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
  }

  .reference-title {
    align-self: flex-start;
    font-size: 2.4rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  .reference-list {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    list-style: none;
    padding: 0;
  }

  .reference-item {
    color: #1b1d1d;
    font-size: 1.6rem;
    font-weight: 400;
  }

  .item-record {
    align-self: flex-start;
    margin: 0 0 3rem;
  }

  .tags-wrapper {
    align-self: flex-start;
  }

  .record-title {
    font-size: 2.4rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  .record-data {
    color: #1b1d1d;
    font-size: 1.6rem;
    font-weight: 400;
    margin: 0;
  }

  .tags-title {
    align-self: flex-start;
    font-size: 2.4rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  .tags-wrapper {
    display: flex;
    gap: 1rem;
    margin: 0 0 2rem;
  }

  .tag {
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 1.5rem;
    color: #1b1d1d;
    font-size: 1.25rem;
    font-weight: 500;
    padding: 0.5rem 1rem;

    transition: all ease-in 0.2s;
    &:hover {
      background-color: #e0e0e0;
      transform: scale(1.1);
      cursor: pointer;
    }
  }

  .engraving-layout {
    display: flex;
    gap: 2rem;
  }

  .engraving-img {
    height: 20rem;
    object-fit: fill;
    border-radius: 1.5rem;
  }

  .engraving-title {
    font-size: 1.8rem;
    font-weight: 600;
  }

  .engraving-author {
    font-size: 1.6rem;
    font-weight: 400;
    margin: 0;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  cursor: pointer;

  &:hover {
    img {
      filter: brightness(0.7);
    }
    button {
      opacity: 1;
    }
  }
`;

export const Image = styled.img`
  width: 440px;
  border-radius: 20px;
  transition: filter 0.3s ease;
`;

export const DownloadButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

export const EngravingLayout = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: scroll;
  scrollbar-width: thin;
`;

export const Col = styled.div`
  flex: 1 1 220px;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
  max-width: 400px;
  cursor: pointer;
`;

export const EngravingImage = styled.img`
  max-height: 40rem;
  max-width: 100%;
  border-radius: 10px;
  transition: filter 0.3s ease;
`;

export const EngravingDescription = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  width: 100%;
`;
