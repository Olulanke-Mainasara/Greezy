import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useLocalStorage } from "react-use";

const MapInfo = () => {
  const mapRef = useRef(null);
  const [confirmed, setConfirmed] = useLocalStorage("confirmed");
  const [lat, setLat] = useState(51.505);
  const [lng, setLng] = useState(-0.09);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], zoom);
    }
  }, [lat, lng, zoom]);

  return (
    <MapContainer
      ref={mapRef}
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
    </MapContainer>
  );
};

export default MapInfo;
