"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  points: { lat: number; lng: number }[];
}

const Map = ({ points }: MapProps) => {
  return (
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {points.map((point, index) => (
        <Marker
          key={index}
          position={[point.lat, point.lng]}
          icon={L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41],
          })}
        >
          <Popup>
            Point {index + 1}
            <br />
            {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
