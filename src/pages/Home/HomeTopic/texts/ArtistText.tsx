import React from "react";
import { DataTitle, DataInfoContainer, DataInfo } from "./styles";
import { Artist } from "../../mockData";

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
      {artist.dateOfBirth && <DataInfo>{artist.dateOfBirth}</DataInfo>}
    </>
  );
};
export default ArtistText;
