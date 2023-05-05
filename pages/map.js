import Head from "next/head";

import Nav from "@/components/Nav";
import L from "leaflet";
import React, { useEffect, useRef, useState } from "react";

const Map = () => {
  const mapContainer = useRef(null);
  const [lat, setLat] = useState(51.505);
  const [lng, setLng] = useState(-0.09);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    const map = L.map(mapContainer.current).setView([lat, lng], zoom);
    const tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
      }
    );
    tileLayer.addTo(map);

    return () => map.remove();
  }, [lat, lng, zoom]);

  return (
    <>
      <Head>
        <title>Map | Greezy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center w-screen h-screen gap-8">
        <Nav />
        <div className="h-full overflow-hidden grow">
          <div ref={mapContainer} className="w-full h-full" />
        </div>
      </main>
    </>
  );
};

export default Map;
