import React from "react";
import { DataTitle, DataInfoContainer, DataInfo, PaintingDate } from "./styles";
import { Painting } from "src/utils/mockData";
import { trimString } from "src/utils/strings";

const PaintingText = ({ painting }: { painting: Painting }) => {
  return (
    <>
      {painting.dateOfCreation ? (
        <DataTitle>
          {painting.title}{" "}
          {<PaintingDate>({painting.dateOfCreation})</PaintingDate>}
        </DataTitle>
      ) : (
        <DataTitle>{painting.title}</DataTitle>
      )}

      <DataInfoContainer>
        {/* {painting.city && <DataInfo>{painting.city}</DataInfo>}
        {painting.state && painting.city ? (
          <DataInfo>, {painting.state}</DataInfo>
        ) : (
          <DataInfo>{painting.state}</DataInfo>
        )} */}
        <DataInfo>{trimString(painting?.church?.name, 24)}</DataInfo>
      </DataInfoContainer>
    </>
  );
};
export default PaintingText;
