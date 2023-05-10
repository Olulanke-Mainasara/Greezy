import gettingCurrentConditions from "@/utils/getCurrentConditions";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useQueryClient } from "react-query";

const TodayInfo = () => {
  const queryClient = useQueryClient();
  const todayForecast = queryClient.getQueryData("weatherInfo");

  if (!todayForecast) {
    return (
      <section className="flex flex-col w-full space-y-6 overflow-hidden xl:space-y-0 xl:gap-6 h-fit xl:h-auto">
        <h1 className="text-3xl">Today&apos;s Forecast</h1>

        <section className="w-full h-full overflow-scroll border shadow-2xl rounded-3xl hideScroll background">
          <section className="flex items-center justify-center w-full h-48 text-2xl xl:h-full xs:text-xl">
            <h1>No weather info available</h1>
          </section>
        </section>
      </section>
    );
  }

  const accurateDate = new Date();

  const timeStamps = todayForecast.hourly.time;
  const hourWeather = todayForecast.hourly.temperature_2m;
  const weatherCode = todayForecast.hourly.weathercode;

  return (
    <section className="flex flex-col w-full space-y-6 overflow-hidden shadow-lg xl:space-y-0 xl:gap-6 h-fit xl:h-auto rounded-b-3xl">
      <h1 className="flex items-center justify-between gap-4 text-3xl">
        Today&apos;s Forecast
        <span className="flex items-center gap-2 text-base">
          slide <FaArrowRight />
        </span>
      </h1>

      <section className="w-full h-full overflow-scroll border rounded-3xl hideScroll background">
        <section className="flex h-48 gap-4 px-4 shadow-2xl xl:h-full w-fit">
          {timeStamps.map((time, index) => {
            const splitDate = timeStamps[index].split("T");
            const furtherSplitDate = splitDate[0].split("-");
            const furtherSplitTime = splitDate[1].split(":");

            if (
              (furtherSplitDate[2] < accurateDate.getDate() &&
                furtherSplitDate[1] == accurateDate.getMonth() + 1) ||
              furtherSplitDate[2] > accurateDate.getDate() + 1
            ) {
              return;
            } else if (
              (furtherSplitDate[2] == accurateDate.getDate() &&
                furtherSplitTime[0] < accurateDate.getHours()) ||
              furtherSplitDate[2] > accurateDate.getDate() + 1
            ) {
              return;
            }

            return (
              <div
                key={time}
                className="flex flex-col items-center justify-around w-32 h-full text-white"
              >
                <h1 className="text-base">
                  {(furtherSplitTime[0] == accurateDate.getHours() &&
                  furtherSplitDate[2] == accurateDate.getDate()
                    ? "Now"
                    : splitDate[1]) +
                    (furtherSplitTime[0] > 11 &&
                    furtherSplitTime[0] != accurateDate.getHours()
                      ? "PM"
                      : furtherSplitTime[0] <= 11 &&
                        furtherSplitTime[0] != accurateDate.getHours()
                      ? "AM"
                      : "")}
                </h1>
                <h1 className="text-lg text-center">
                  {gettingCurrentConditions(weatherCode[index])}
                </h1>
                <h1 className="text-xl ">{hourWeather[index] + "°C"}</h1>
              </div>
            );
          })}
        </section>
      </section>
    </section>
  );
};

export default TodayInfo;
