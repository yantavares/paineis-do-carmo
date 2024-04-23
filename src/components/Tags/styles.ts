import styled from "styled-components";
import colors from "src/utils/colors";

export const Tag = styled.span`
  background-color: ${colors.white};
  border-radius: 1rem;
  color: #333;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  transition: all 0.3s;
  &:hover {
    border-color: ${colors.green};
    transform: scale(1.08);
    cursor: pointer;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
`;
