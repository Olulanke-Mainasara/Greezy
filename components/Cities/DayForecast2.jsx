import gettingCurrentConditions from "@/utils/getCurrentConditions";
import getWeatherInfo from "@/utils/getWeatherInfo";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { useLocalStorage } from "react-use";

import ErrorOccurred from "../Feedback/ErrorOccurred";
import GeoNotActive from "../Feedback/GeoNotActive";
import GettingWeatherInfo from "../Feedback/GettingWeatherInfo";

const DayForecast2 = () => {
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [confirmed, setConfirmed] = useLocalStorage("confirmed");
  const [askUser, setAskUser] = useState(null);
  const queryClient = useQueryClient();
  const dayForecast = queryClient.getQueryData("weatherInfo");

  const cancelSupported = () => {
    setSupported(true);
  };

  const handleLocationClick = () => {
    setConfirmed("true");
    setError(null);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setSupported(false);
    }

    setAskUser(true);

    if (confirmed === "true") {
      if (!dayForecast) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation(position.coords);
          },
          (error) => {
            setSupported(false);
          }
        );
      }

      setAskUser(false);
    }

    setSupported(true);
  }, [confirmed, dayForecast]);

  const { isLoading, isError } = useQuery(
    "weatherInfo",
    () => getWeatherInfo(location),
    {
      enabled: !!location,
      staleTime: 300000,
    }
  );

  if (!supported) {
    return <GeoNotActive cancelSupported={cancelSupported} />;
  }

  if (isLoading) {
    return <GettingWeatherInfo />;
  }

  if (error) {
    return <ErrorOccurred />;
  }

  if (isError) {
    if (error === null) {
      setError(true);
      setLocation(null);
    }
  }

  if (askUser || dayForecast == undefined) {
    return (
      <section className="xl:w-[30%] border h-full rounded-3xl flex flex-col gap-6 px-7 py-7 shadow-2xl text-white background">
        <h1 className="text-3xl text-center">Your 7-day forecast</h1>

        <section
          id="dayForecasts2"
          className="flex flex-col items-center justify-center w-full h-full gap-6 overflow-hidden"
        >
          <h1 className="text-2xl text-center xs:text-xl">No weather info available</h1>
          <button
            className="px-8 py-2 text-black duration-300 bg-white border rounded-lg xs:px-4 hover:bg-black hover:text-white"
            onClick={handleLocationClick}
          >
            Allow location access
          </button>
        </section>
      </section>
    );
  }

  const accurateDate = new Date();

  const dates = dayForecast.daily.time;
  const weatherCodes = dayForecast.daily.weathercode;
  const minTemp = dayForecast.daily.temperature_2m_min;
  const maxTemp = dayForecast.daily.temperature_2m_max;

  return (
    <section className="xl:w-[30%] border h-full rounded-3xl flex flex-col p-5 sm:p-7 shadow-2xl text-white background">
      <h1 className="text-3xl text-center">Your 7-day forecast</h1>

      <section
        id="dayForecasts2"
        className="flex flex-col w-full h-full overflow-hidden"
      >
        <div className="flex items-center justify-between w-full xl:h-[20%] h-20">
          <h1>Date</h1>
          <h1>condition</h1>
          <h1 className="text-center xs:w-min">temp (min-max)</h1>
        </div>
        {dates.map((date, index) => {
          const splitDate = date.split("-");

          return (
            <div
              key={date}
              className="flex items-center justify-between w-full xl:h-[20%] border-t h-20"
            >
              <h1>
                {splitDate[2] == accurateDate.getDate()
                  ? "Today"
                  : splitDate[2] + " / " + splitDate[1]}
              </h1>
              <h1>{gettingCurrentConditions(weatherCodes[index])}</h1>
              <h1>{minTemp[index] + " - " + maxTemp[index]}</h1>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default DayForecast2;
