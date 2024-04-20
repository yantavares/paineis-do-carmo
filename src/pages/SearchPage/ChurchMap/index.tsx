import React, { useEffect } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import brazilGeoJSON from "src/json/br_states.json"; // Ajuste o caminho conforme necessário
import colors from "src/utils/colors";
import { SearchHeader } from "./styles";

const ChurchMap = () => {
  const ShowStateNameOnHover = () => {
    const map = useMap();

    useEffect(() => {
      const initialStateNameIcon = L.marker(map.getCenter(), {
        icon: L.divIcon({
          className: "state-name-icon",
          html: "",
        }),
        interactive: false, // Torna o marcador não-reativo a eventos de mouse
      }).addTo(map);

      const geoJsonLayer = L.geoJSON(brazilGeoJSON, {
        onEachFeature: (feature, layer) => {
          layer.on("mouseover", (e) => {
            initialStateNameIcon.setIcon(
              L.divIcon({
                className: "state-name-icon",
                html: `<div>${feature.properties.SIGLA}</div>`, // Atualiza o HTML com a sigla do estado
              })
            );
            initialStateNameIcon.setOpacity(1); // Torna visível
          });

          layer.on("mousemove", (e) => {
            initialStateNameIcon.setLatLng(e.latlng); // Atualiza a posição para seguir o cursor
          });

          layer.on("mouseout", () => {
            initialStateNameIcon.setOpacity(0); // Esconde o ícone
          });
        },
      }).addTo(map);

      return () => {
        // Limpeza ao desmontar o componente
        initialStateNameIcon.remove();
        geoJsonLayer.remove();
      };
    }, [map]);

    return null;
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "1.4em" }}>
        <SearchHeader>
          Nossa Coleção de <span style={{ color: colors.green }}>Igrejas</span>
        </SearchHeader>
        <h4 style={{ padding: 0, margin: 0, fontSize: "2rem" }}>por estado</h4>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <MapContainer
          center={[-14.235, -51.9253]}
          zoom={4}
          style={{
            height: "52rem",
            border: "1px dashed rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f5f5f5",
            width: "80%",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          scrollWheelZoom={true}
          doubleClickZoom={false}
          zoomControl={true}
          dragging={true}
          zoomAnimation={true}
          attributionControl={false}
        >
          <GeoJSON
            data={brazilGeoJSON}
            style={() => ({
              weight: 10,
              stroke: true,
              color: colors.darkGreen,
              fillColor: colors.lightGreen,
              fillOpacity: 0.8,
            })}
          />
          <ShowStateNameOnHover />
        </MapContainer>
      </div>
    </>
  );
};

export default ChurchMap;
