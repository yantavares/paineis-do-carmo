import React from "react";
import { DataTitle, DataInfoContainer, DataInfo, PaintingDate } from "./styles";
import { Painting } from "src/utils/mockData";

const PaintingText = ({ painting }: { painting: Painting }) => {
  return (
    <>
      {painting.date ? (
        <DataTitle>
          {painting.title} <PaintingDate>({painting.date})</PaintingDate>
        </DataTitle>
      ) : (
        <DataTitle>{painting.title}</DataTitle>
      )}

      <DataInfoContainer>
        {painting.city && <DataInfo>{painting.city}</DataInfo>}
        {painting.state && painting.city ? (
          <DataInfo>, {painting.state}</DataInfo>
        ) : (
          <DataInfo>{painting.state}</DataInfo>
        )}
      </DataInfoContainer>
    </>
  );
};
export default PaintingText;
