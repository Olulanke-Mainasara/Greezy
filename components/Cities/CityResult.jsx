/* eslint-disable react-hooks/exhaustive-deps */
import gettingCurrentConditions from "@/utils/getCurrentConditions";
import getWeatherInfo from "@/utils/getWeatherInfo";
import React, { useEffect, useState } from "react";

const CityResult = ({ result }) => {
  const [cityData, setCityData] = useState(null);

  const handleRender = async () => {
    const data = await getWeatherInfo(result);
    const usedInfo = data.current_weather;
    setCityData(usedInfo);
  };

  useEffect(() => {
    handleRender();
  }, [result]);

  if (!cityData) {
    return;
  }

  const locationData = result.display_name.split(",");
  const length = locationData.length;

  return (
    <article className="flex flex-col justify-around w-full p-5 mx-auto text-white border shadow-2xl h-52 sm:aspect-square rounded-3xl xl:w-52">
      <h1 className="text-base">
        {length > 2
          ? locationData[0] +
            ", " +
            locationData[1] +
            ", " +
            locationData[length - 1]
          : locationData[0] + ", " + locationData[length - 1]}
      </h1>
      <h1 className="text-6xl text-center">{cityData.temperature + "°"}</h1>
      <h1 className="text-base text-right">
        {gettingCurrentConditions(cityData.weathercode)}
      </h1>
    </article>
  );
};

export default CityResult;
