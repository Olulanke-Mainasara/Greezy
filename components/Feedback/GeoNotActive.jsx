import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";

const GeoNotActive = ({ cancelSupported }) => {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 z-20 flex flex-col gap-6 items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
      <h1 className="text-2xl text-center md:text-4xl">
        Geolocation is not active / supported
      </h1>
      <p className="text-center w-[93%] max-w-lg">
        Please check your settings and allow location access for this website or
        check your internet connectivity and make sure you are connected. If
        after confirming all these, it still doesn&apos;t work, then geolocation
        is NOT supported by the browser you are currently using.
      </p>
      <div className="flex gap-6 xs:flex-col">
        {router.pathname === "/" ? (
          <Link
            href={"/cities"}
            className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
          >
            Search for cities
          </Link>
        ) : (
          <button
            className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
            onClick={cancelSupported}
          >
            Cancel
          </button>
        )}

        <button
          className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default GeoNotActive;
