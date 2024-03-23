import styled from "styled-components";
import colors from "src/utils/colors";

export const DataTitle = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    color: ${colors.green};
  }
`;

export const DataInfo = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
`;

export const DataInfoContainer = styled.div`
  display: flex;
`;

export const PaintingDate = styled.span`
  font-size: 0.8rem;
  color: ${colors.gray};
`;
