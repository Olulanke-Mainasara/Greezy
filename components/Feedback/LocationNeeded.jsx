import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";

const LocationNeeded = ({ handleActive, handleLocationClick }) => {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 z-20 flex flex-col gap-6 items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
      <h1 className="w-[90%] text-2xl text-center md:text-4xl">
        We need your location 👉👈
      </h1>
      <p className="text-center w-[95%] max-w-sm">
        In order to display accurate weather information for you, our website
        would need to access your location
      </p>
      <div className="flex gap-6">
        {router.pathname === "/" ? (
          <Link
            className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
            href={"/cities"}
          >
            Deny
          </Link>
        ) : (
          <button
            className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
            onClick={handleActive}
          >
            Deny
          </button>
        )}
        <button
          className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
          onClick={handleLocationClick}
        >
          Allow
        </button>
      </div>
    </div>
  );
};

export default LocationNeeded;
