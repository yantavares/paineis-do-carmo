import React from "react";
import { DataTitle, DataInfoContainer, DataInfo } from "./styles";
import { Church } from "src/utils/mockData";
import { trimString } from "src/utils/strings";

const ChurchText = ({ church }: { church: Church }) => {
  return (
    <>
      <DataTitle>{trimString(church.name, 34)}</DataTitle>
      <DataInfoContainer>
        {church.city && <DataInfo>{church.city}</DataInfo>}
        {church.state && church.city ? (
          <DataInfo>, {church.state}</DataInfo>
        ) : (
          <DataInfo>{church.state}</DataInfo>
        )}
      </DataInfoContainer>
    </>
  );
};
export default ChurchText;
