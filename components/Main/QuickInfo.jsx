import React from "react";

const QuickInfo = () => {
  return (
    <section className="grid w-full grid-cols-2 gap-6 text-white xs:grid-cols-1 xl:grid-cols-3">
      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 id="currentLocation" className="text-xl">
          - -
        </h1>
        <h1 id="currentWeather" className="text-5xl sm:text-7xl">
          - -
        </h1>
        <h1 id="currentCondition" className="text-xl">
          - -
        </h1>
      </section>

      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 className="text-xl">Wind Speed</h1>
        <h1 id="windSpeed" className="text-5xl sm:text-7xl">
          - -
        </h1>
        <h1 className="text-xl">m/s</h1>
      </section>

      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 className="text-xl">U.V Index</h1>
        <h1 id="uvIndex" className="sm:text-5xl text-7xl">
          - -
        </h1>
        <h1 id="exposureLevel" className="text-xl">
          - -
        </h1>
      </section>
    </section>
  );
};

export default QuickInfo;
