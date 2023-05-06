import dynamic from "next/dynamic";

const Map = dynamic(() => import("./MapInfo"), { ssr: false });

export default Map