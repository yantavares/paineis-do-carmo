import React, { memo } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import brazilGeoJSON from "src/json/br_states.json";
import colors from "src/utils/colors";
import { SearchHeader } from "./styles";

const ChurchMap = () => {
  const mapStyle = {
    color: "#aa1703", // This is the correct property for stroke color
    weight: 2,
    opacity: 1,
    fillColor: colors.mainColor,
    fillOpacity: 0.15,
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "1.4em" }}>
        <SearchHeader>
          Nossa Coleção de <span style={{ color: colors.mainColor }}>Igrejas</span>
        </SearchHeader>
        <h4 style={{ padding: 0, margin: 0, fontSize: "2rem" }}>por estado</h4>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
        <MapContainer
          center={[-14.235, -51.9253]}
          zoom={4}
          style={{
            height: "52rem",
            border: "1px dashed rgba(0, 0, 0, 0.25)",
            backgroundColor: "#f5f5f5",
            width: "70%",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          scrollWheelZoom={true}
          doubleClickZoom={false}
          zoomControl={true}
          dragging={true}
          zoomAnimation={true}
          attributionControl={false}>
          <GeoJSON
            data={brazilGeoJSON}
            style={mapStyle}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default memo(ChurchMap);
