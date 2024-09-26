import styled from "styled-components";
import colors from "src/utils/colors";

export const DataTitle = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 1.4rem;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    color: ${colors.mainColor};
  }
`;

export const DataInfo = styled.span`
  padding: 0;
  margin: 0;
  font-size: 1.4rem;
  height: "100%";
`;

export const DataInfoContainer = styled.div`
  display: flex;
`;

export const PaintingDate = styled.span`
  font-size: 1.2rem;
  color: ${colors.gray};
`;
