import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import brazilGeoJSON from "src/assets/br_states.json"; // Ajuste o caminho conforme necessário

const ChurchMap = () => {
  const ShowStateNameOnHover = () => {
    const map = useMap();
    const [stateNameIcon, setStateNameIcon] = useState(null);

    useEffect(() => {
      // Cria um L.divIcon vazio que será atualizado e movido conforme necessário
      const initialStateNameIcon = L.marker([0, 0], {
        icon: L.divIcon({
          className: "state-name-icon",
          html: "",
        }),
        interactive: false, // Torna o marcador não-reativo a eventos de mouse
      }).addTo(map);

      setStateNameIcon(initialStateNameIcon);

      // Adiciona interatividade ao GeoJSON para mostrar nomes dos estados no hover
      const geoJsonLayer = L.geoJSON(brazilGeoJSON, {
        onEachFeature: (feature, layer) => {
          layer.on("mouseover", (e) => {
            const center = e.target.getBounds().getCenter();
            initialStateNameIcon.setLatLng(center);
            initialStateNameIcon.setOpacity(1); // Torna visível
            initialStateNameIcon.setIcon(
              L.divIcon({
                className: "state-name-icon",
                html: `<div>${feature.properties.SIGLA}</div>`, // Atualiza o HTML com a sigla do estado
              })
            );
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
    <MapContainer
      center={[-14.235, -51.9253]}
      zoom={4}
      style={{
        height: "500px",
        width: "100%",
        cursor: "pointer",
        transition: "all 0.3s",
      }}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      dragging={false}
      attributionControl={false}
    >
      <GeoJSON
        data={brazilGeoJSON}
        style={() => ({
          color: "#4a83ec",
          weight: 1,
          fillColor: "#ffffff",
          fillOpacity: 1,
        })}
      />
      <ShowStateNameOnHover />
    </MapContainer>
  );
};

export default ChurchMap;
