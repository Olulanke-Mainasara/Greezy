import gettingCurrentConditions from "@/utils/getCurrentConditions";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { useLocalStorage } from "react-use";

const DayForecast2 = () => {
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [confirmed, setConfirmed] = useLocalStorage("confirmed");
  const [askUser, setAskUser] = useState(null);
  const queryClient = useQueryClient();
  const dayForecast = queryClient.getQueryData("weatherInfo");

  const cancelConfirmed = () => {
    setConfirmed("");
  };

  const cancelError = () => {
    setError("");
    setConfirmed("");
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

  async function fetchData(location) {
    const rawData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,pressure_msl,visibility,windspeed_80m,winddirection_80m&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&windspeed_unit=ms&timezone=auto`
    );
    const jsonData = rawData.json();
    return jsonData;
  }

  const { isLoading, isError } = useQuery(
    "weatherInfo",
    () => fetchData(location),
    {
      enabled: !!location,
      staleTime: 300000,
    }
  );

  if (!supported) {
    return (
      <div className="absolute top-0 left-0 z-20 flex flex-col gap-6 items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
        <h1 className="text-2xl text-center md:text-4xl">
          Geolocation is not active / supported
        </h1>
        <p className="text-center w-[95%] max-w-lg">
          Please check your settings and allow location access for this website
          or check your internet connectivity and make sure you are connected.
          If after confirming all these, it still doesn&apos;t work, then
          geolocation is NOT supported by the browser you are currently using.
        </p>
        <div className="flex gap-6 xs:flex-col">
          <button
            className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
            onClick={() => cancelConfirmed()}
          >
            Cancel
          </button>
          <button
            className="px-8 py-2 text-black duration-300 bg-white rounded-lg hover:bg-black hover:text-white"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
        <h1 className="flex items-center justify-center gap-2 text-2xl text-center md:text-3xl xs:flex-col">
          Getting weather information
          <Loading type="spinningBubbles" color="#fff" height={50} width={50} />
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-0 left-0 z-20 flex flex-col gap-6 items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
        <h1 className="text-2xl text-center md:text-3xl">An error occurred</h1>
        <p className="text-center w-[95%] max-w-lg">
          A server error occurred, try reloading the browser and check to make
          sure that you are connected to a functioning internet connection. If
          the error persists, please contact my developers for more info and a
          possible resolution of the error.
        </p>
        <div className="flex gap-6 xs:flex-col">
          <button
            className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
            onClick={() => cancelError()}
          >
            Cancel
          </button>
          <button
            className="px-8 py-2 text-black duration-300 bg-white rounded-lg hover:bg-black hover:text-white"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (isError) {
    if (error === null) {
      setError(true);
      setLocation(null);
    }
  }

  if (askUser || dayForecast == undefined) {
    return (
      <section className="xl:w-[30%] h-full rounded-3xl flex flex-col gap-6 px-7 py-7 shadow-2xl text-white background mb-[24%] sm:mb-[14%] xl:mb-0">
        <h1 className="text-3xl text-center">Your 7-day forecast</h1>

        <section
          id="dayForecasts2"
          className="flex flex-col items-center justify-center w-full h-full gap-6 overflow-hidden"
        >
          <h1 className="text-2xl text-center">No weather info available</h1>
          <button
            className="px-8 py-2 text-black duration-300 bg-white rounded-lg xs:px-4 hover:bg-black hover:text-white"
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
    <section className="xl:w-[30%] h-full rounded-3xl flex flex-col p-5 sm:p-7 shadow-2xl text-white background mb-[24%] sm:mb-[14%] xl:mb-0">
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
