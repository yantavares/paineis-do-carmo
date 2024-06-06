import React, { memo, useEffect } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import brazilGeoJSON from "src/json/br_states.json";
import colors from "src/utils/colors";
import { SearchHeader } from "./styles";
import { useNavigate } from "react-router-dom";

const ChurchMap = () => {
  const ShowStateNameOnHover = () => {
    const map = useMap();
    const navigate = useNavigate();

    useEffect(() => {
      const initialStateNameIcon = L.marker(map.getCenter(), {
        icon: L.divIcon({
          className: "state-name-icon",
          html: "",
        }),
        interactive: false,
      }).addTo(map);

      const hoverStyle = {
        fillColor: "gray",
        fillOpacity: 0.8,
      };

      const originalStyle = () => ({
        weight: 10,
        stroke: true,
        color: colors.darkGreen,
        fillColor: colors.lightGreen,
        fillOpacity: 0.9,
      });

      const geoJsonLayer = L.geoJSON(brazilGeoJSON, {
        style: originalStyle,
        onEachFeature: (feature, layer) => {
          layer.on("mouseover", (e) => {
            const pathLayer = layer as L.Path;
            pathLayer.setStyle(hoverStyle);

            initialStateNameIcon.setIcon(
              L.divIcon({
                className: "state-name-icon",
                html: `<div>${feature.properties.SIGLA}</div>`,
              })
            );
            initialStateNameIcon.setOpacity(1);
          });

          layer.on("mousemove", (e) => {
            initialStateNameIcon.setLatLng(e.latlng);
          });

          layer.on("mouseout", () => {
            const pathLayer = layer as L.Path;
            pathLayer.setStyle(originalStyle());
            initialStateNameIcon.setOpacity(0);
          });

          layer.on("click", (e) => {
            console.log(feature.properties.SIGLA);
            navigate(`/pesquisa/igrejas/${feature.properties.SIGLA}`);
          });
        },
      }).addTo(map);

      return () => {
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

export default memo(ChurchMap);
