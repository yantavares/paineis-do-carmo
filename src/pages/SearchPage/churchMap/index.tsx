import React, { useEffect } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import brazilGeoJSON from "src/assets/br_states.json"; // Caminho para o seu arquivo GeoJSON

const ChurchMap = () => {
  const AddSiglasOnHover = () => {
    const map = useMap();

    useEffect(() => {
      // Cria e retorna um marcador de sigla baseado na posição e sigla fornecidas
      const createSiglaMarker = (latlng, sigla) => {
        return L.marker(latlng, {
          icon: L.divIcon({
            className: "sigla-icon", // Classe para estilização customizada
            html: `<div>${sigla}</div>`,
            iconSize: [20, 20],
          }),
        });
      };

      // Adiciona interatividade ao GeoJSON para mostrar siglas no hover
      const geoJsonLayer = L.geoJSON(brazilGeoJSON, {
        onEachFeature: (feature, layer) => {
          let siglaMarker;

          layer.on("mouseover", (e) => {
            const center = e.target.getBounds().getCenter();
            siglaMarker = createSiglaMarker(center, feature.properties.SIGLA);
            siglaMarker.addTo(map);
          });

          layer.on("mouseout", () => {
            if (siglaMarker) {
              map.removeLayer(siglaMarker);
              siglaMarker = null;
            }
          });
        },
      }).addTo(map);

      return () => {
        // Limpeza ao desmontar o componente
        geoJsonLayer.remove();
      };
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      center={[-14.235, -51.9253]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      dragging={false}
      attributionControl={false}
    >
      <GeoJSON
        data={brazilGeoJSON}
        style={() => ({
          color: "#4a83ec", // Cor da borda
          weight: 1, // Espessura da borda
          fillColor: "#ffffff", // Cor de preenchimento alterada para branco
          fillOpacity: 1, // Opacidade do preenchimento
        })}
      />
      <AddSiglasOnHover />
    </MapContainer>
  );
};

export default ChurchMap;
