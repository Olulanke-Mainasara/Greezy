import React, { useState } from "react";
import { useQueryClient } from "react-query";
import gettingCurrentConditions from "@/utils/getCurrentConditions";
import getUvInfo from "@/utils/getUvInfo";
import { FaMapMarkerAlt, FaSun, FaWind } from "react-icons/fa";

const QuickInfo = () => {
  const queryClient = useQueryClient();
  const [uvInfo] = useState(getUvInfo());

  // Retrieve weather data from the cache
  const weatherData = queryClient.getQueryData("weatherInfo");

  if (!weatherData) {
    return (
      <section className="grid w-full grid-cols-2 gap-6 text-white xs:grid-cols-1 xl:grid-cols-3">
        <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
          <h1 id="currentLocation" className="flex items-center gap-2 text-xl">
            <FaMapMarkerAlt /> - -
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

        <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
          <h1 className="flex items-center gap-2 text-xl">
            - - <FaSun />
          </h1>
          <h1 id="uvIndex" className="sm:text-5xl text-7xl">
            - -
          </h1>
          <h1 id="exposureLevel" className="text-xl">
            - -
          </h1>
        </section>
      </section>
    );
  }

  const location = weatherData.timezone.split("/");

  return (
    <section className="grid w-full grid-cols-2 gap-6 text-white xs:grid-cols-1 xl:grid-cols-3">
      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 id="currentLocation" className="flex items-center gap-2 text-xl">
          <FaMapMarkerAlt />
          {location[1]}
        </h1>
        <h1 id="currentWeather" className="text-5xl sm:text-7xl">
          {weatherData.current_weather.temperature + "°"}
        </h1>
        <h1 id="currentCondition" className="text-xl text-center">
          {gettingCurrentConditions(weatherData.current_weather.weathercode)}
        </h1>
      </section>

      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 className="text-xl">Wind Speed</h1>
        <h1 id="windSpeed" className="text-5xl sm:text-7xl">
          {Math.round(weatherData.current_weather.windspeed)}
        </h1>
        <h1 className="text-xl">m / s</h1>
      </section>

      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 className="text-xl">U.V Index</h1>
        <h1 id="uvIndex" className="sm:text-5xl text-7xl">
          {/* {uvInfo[0] || "- -"} */}
        </h1>
        <h1 id="exposureLevel" className="text-xl">
          {/* {uvInfo[1]} */}
        </h1>
      </section>
    </section>
  );
};

export default QuickInfo;
