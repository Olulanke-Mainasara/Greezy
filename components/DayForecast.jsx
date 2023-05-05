import gettingCurrentConditions from "@/utils/getCurrentConditions";
import React from "react";
import { useQueryClient } from "react-query";

const DayForecast = () => {
  const queryClient = useQueryClient();
  const dayForecast = queryClient.getQueryData("weatherInfo");

  if (!dayForecast) {
    return (
      <section className="xl:w-[30%] h-full rounded-3xl flex flex-col gap-6 px-7 py-7 shadow-2xl text-white background mb-[24%] sm:mb-[14%] xl:mb-0">
        <h1 className="text-3xl text-center">Your 7-day forecast</h1>

        <section
          id="dayForecasts2"
          className="flex flex-col items-center justify-center w-full h-full gap-6 overflow-hidden"
        >
          <h1 className="text-2xl">No weather info available</h1>
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

export default DayForecast;
