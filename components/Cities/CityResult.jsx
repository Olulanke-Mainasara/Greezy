/* eslint-disable react-hooks/exhaustive-deps */
import gettingCurrentConditions from "@/utils/getCurrentConditions";
import getWeatherInfo from "@/utils/getWeatherInfo";
import React, { useEffect, useState } from "react";

const CityResult = ({ result }) => {
  const [cityData, setCityData] = useState(null);

  const handleRender = async () => {
    const data = await getWeatherInfo(result, "addressdetails=1");
    const usedInfo = data.current_weather;
    setCityData(usedInfo);
  };

  useEffect(() => {
    handleRender();
  }, [result]);

  if (!cityData) {
    return;
  }

  return (
    <article className="flex flex-col justify-around w-full p-5 mx-auto text-white border shadow-2xl h-52 sm:aspect-square rounded-3xl xl:w-52">
      <h1 className="text-base">{result.display_name}</h1>
      <h1 className="text-6xl text-center">{cityData.temperature + "°C"}</h1>
      <h1 className="text-base text-right">
        {gettingCurrentConditions(cityData.weathercode)}
      </h1>
    </article>
  );
};

export default CityResult;
