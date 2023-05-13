import gettingCurrentConditions from "@/utils/getCurrentConditions";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaWind } from "react-icons/fa";
import { useQueryClient } from "react-query";

import UvInfo from "./UvInfo";

const QuickInfo = () => {
  const queryClient = useQueryClient();
  const weatherData = queryClient.getQueryData("weatherInfo");
  const [confirmed, setConfirmed] = useState(false);

  if (!weatherData) {
    return (
      <section className="grid w-full grid-cols-2 gap-6 text-white xs:grid-cols-1 xl:grid-cols-3">
        <section className="flex flex-col items-center col-span-2 border shadow-2xl md:flex-row xl:flex-col rounded-3xl justify-evenly md:h-48 h-44 xl:h-full xl:col-span-1 xs:col-span-1">
          <h1 id="currentLocation" className="flex items-center gap-2 text-xl">
            - <FaMapMarkerAlt /> -
          </h1>
          <h1 id="currentWeather" className="text-5xl sm:text-7xl">
            - -
          </h1>
          <h1 id="currentCondition" className="text-xl text-center">
            - -
          </h1>
        </section>

        <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
          <h1 className="flex items-center gap-2 text-xl">
            - - <FaWind />
          </h1>
          <h1 id="windSpeed" className="text-5xl sm:text-7xl">
            - -
          </h1>
          <h1 className="text-xl">- -</h1>
        </section>

        <UvInfo confirmed={confirmed} />
      </section>
    );
  }

  if (weatherData) {
    if (confirmed === false) {
      setConfirmed(true);
    }
  }

  const location = weatherData.timezone.split("/");

  return (
    <section className="grid w-full grid-cols-2 gap-6 text-white xs:grid-cols-1 xl:grid-cols-3">
      <section className="flex flex-col items-center col-span-2 border shadow-2xl md:flex-row xl:flex-col rounded-3xl justify-evenly md:h-48 h-44 xl:h-full xl:col-span-1 xs:col-span-1">
        <h1 id="currentLocation" className="flex items-center gap-2 text-xl">
          <FaMapMarkerAlt />
          {location[1]}
        </h1>
        <h1 id="currentWeather" className="text-5xl sm:text-7xl">
          {weatherData.current_weather.temperature + "°C"}
        </h1>
        <h1 id="currentCondition" className="text-xl text-center">
          {gettingCurrentConditions(weatherData.current_weather.weathercode)}
        </h1>
      </section>

      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 className="flex items-center gap-2 text-xl">
          Wind <FaWind />
        </h1>
        <h1 id="windSpeed" className="text-5xl sm:text-7xl">
          {weatherData.current_weather.windspeed}
        </h1>
        <h1 className="text-xl">m / s</h1>
      </section>

      <UvInfo confirmed={confirmed} />
    </section>
  );
};

export default QuickInfo;
