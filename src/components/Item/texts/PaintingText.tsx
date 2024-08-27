import React from "react";
import { DataTitle, DataInfoContainer, DataInfo, PaintingDate } from "./styles";
import { Painting } from "src/utils/mockData";

const trimString = (str: string, length: number) => {
  return str?.length > length ? str?.substring(0, length) + "..." : str;
};

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
        <DataInfo>{trimString(painting?.church?.name, 35)}</DataInfo>
      </DataInfoContainer>
    </>
  );
};
export default PaintingText;
