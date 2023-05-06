import dynamic from "next/dynamic";

const MapInfo = dynamic(() => import("./MapInfo"), { ssr: false });

export default MapInfo;
