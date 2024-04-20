import React, { useEffect } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import brazilGeoJSON from "src/assets/br_states.json"; // Caminho para o seu arquivo GeoJSON

const ChurchMap = () => {
  // Componente auxiliar para adicionar as siglas após o mapa ser inicializado
  const AddSiglas = () => {
    const map = useMap();

    useEffect(() => {
      // Função para calcular o centro do polígono de cada estado para posicionar a sigla
      const getCenterOfPolygon = (geoJsonFeature) => {
        const latlngs = L.geoJSON(geoJsonFeature).getBounds().getCenter();
        return latlngs;
      };

      // Adiciona a sigla no centro de cada estado
      brazilGeoJSON.features.forEach((feature) => {
        const center = getCenterOfPolygon(feature);
        const sigla = feature.properties.SIGLA; // Ajuste conforme a propriedade correta no seu GeoJSON
        const marker = L.marker(center, {
          icon: L.divIcon({
            className: "sigla-icon", // Adicione estilos no seu CSS para esta classe
            html: `<div>${sigla}</div>`,
            iconSize: [11, 20],
          }),
        }).addTo(map);
      });
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
      <AddSiglas />
    </MapContainer>
  );
};

export default ChurchMap;
