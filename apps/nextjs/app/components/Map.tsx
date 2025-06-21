"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoInfo } from "../interfaces";

interface MapProps {
  geoInfo: GeoInfo;
}

const Map = ({ geoInfo }: MapProps) => {
  const { centroid, bounds } = geoInfo;
  return (
    <MapContainer zoom={1} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker
        position={centroid}
        icon={L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -41],
        })}
      >
        <Popup>
          Centroid
          <br />
          {centroid.lat.toFixed(4)}, {centroid.lng.toFixed(4)}
        </Popup>
      </Marker>
      <Polyline
        positions={[
          [bounds.north, bounds.west],
          [bounds.north, bounds.east],
          [bounds.south, bounds.east],
          [bounds.south, bounds.west],
          [bounds.north, bounds.west],
        ]}
      />
    </MapContainer>
  );
};

export default Map;
