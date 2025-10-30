import React, { memo, useEffect } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import brazilGeoJSON from "src/json/br_states.json";
import colors from "src/utils/colors";
import { SearchHeader } from "./styles";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { SearchHeaderMobile } from "../stylesMobile";

const originalStyle = () => ({
  weight: 10,
  stroke: false,
  fillColor: colors.green,
  fillOpacity: 0.5,
});

const ChurchMap = ({ isMobile }) => {
  const mapStyle = {
    weight: 2,
    opacity: 1,
    fillColor: colors.mainColor,
    fillOpacity: 0.15,
  };

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
        color: "#aa1703",
        weight: 2,
        opacity: 1,
        fillColor: colors.mainColor,
        fillOpacity: 0.15,
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

  if (isMobile) {
    return (
      <>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1.4em" }}>
          <SearchHeaderMobile>
            Nossa Coleção de{" "}
            <span style={{ color: colors.mainColor }}>Igrejas</span>
            <span
              style={{
                padding: 0,
                margin: 0,
                fontSize: "2rem",
                paddingLeft: "1rem",
              }}
            >
              por estado
            </span>
          </SearchHeaderMobile>
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
            zoom={3}
            style={{
              height: "40rem",
              border: "2px solid var(--color-outline)",
              borderRadius: "1rem",
              backgroundColor: "var(--color-surface)",
              width: "100%",
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
            <GeoJSON data={brazilGeoJSON} style={mapStyle} />
            <ShowStateNameOnHover />
          </MapContainer>
        </div>
      </>
    );
  } else
    return (
      <>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1.4em" }}>
          <SearchHeader>
            Nossa Coleção de{" "}
            <span style={{ color: colors.mainColor }}>Igrejas</span>
          </SearchHeader>
          <h4 style={{ padding: 0, margin: 0, fontSize: "2rem" }}>
            por estado
          </h4>
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
              border: "2px solid var(--color-outline)",
              borderRadius: "1rem",
              backgroundColor: "var(--color-surface)",
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
            <GeoJSON data={brazilGeoJSON} style={mapStyle} />
            <ShowStateNameOnHover />
          </MapContainer>
        </div>
      </>
    );
};

export default memo(ChurchMap);
