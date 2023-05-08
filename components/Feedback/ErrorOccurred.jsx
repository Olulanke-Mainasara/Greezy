import Link from "next/link";

import React from "react";

const ErrorOccurred = () => {
  return (
    <div className="absolute top-0 left-0 z-20 flex flex-col gap-6 items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
      <h1 className="text-2xl text-center md:text-3xl">An error occurred</h1>
      <p className="text-center w-[95%] max-w-lg">
        A server error occurred, try reloading the browser and check to make
        sure that you are connected to a functioning internet connection. If the
        error persists, please contact my developers for more info and a
        possible resolution of the error.
      </p>
      <div className="flex gap-6 xs:flex-col">
        <Link
          href={"/cities"}
          className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
        >
          Search for cities
        </Link>
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

export default ErrorOccurred;
