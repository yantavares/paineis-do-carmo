import React from "react";
import { DataTitle, DataInfoContainer, DataInfo } from "./styles";
import { Church } from "../../mockData";

const ChurchText = ({ church }: { church: Church }) => {
  return (
    <>
      <DataTitle>{church.name}</DataTitle>
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
