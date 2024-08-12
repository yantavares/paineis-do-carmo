import React from "react";
import { DataTitle, DataInfoContainer, DataInfo } from "./styles";
import { Artist } from "src/utils/mockData";

const ArtistText = ({ artist }: { artist: Artist }) => {
  return (
    <>
      <DataTitle>{artist.name}</DataTitle>
      <DataInfoContainer>
        {artist.specialty && artist.state ? (
          <DataInfo>
            {artist.specialty} • {artist.state}
          </DataInfo>
        ) : artist.specialty ? (
          <DataInfo>{artist.specialty}</DataInfo>
        ) : artist.state ? (
          <DataInfo>{artist.state}</DataInfo>
        ) : (
          <></>
        )}
      </DataInfoContainer>
      {artist.dateOfBirth ? (
        <DataInfo>{artist.dateOfBirth}</DataInfo>
      ) : (
        <DataInfo>Local de nascimento desconhecido</DataInfo>
      )}
    </>
  );
};
export default ArtistText;
