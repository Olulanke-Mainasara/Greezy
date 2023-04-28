import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { QueryClient, useQueryClient } from "react-query";

const HourlyInfo = () => {
  const QueryClient = useQueryClient();
  const hourlyData = QueryClient.getQueryData("weatherInfo");

  if (!hourlyData) {
    return (
      <section className="flex flex-col justify-between w-full space-y-6 xl:space-y-0 xl:gap-6 h-fit">
        <h1 className="text-3xl">Air Conditions</h1>

        <section className="xl:h-[80%] grid xl:grid-cols-4 h-fit md:grid-cols-3 xs:grid-cols-1 2xl:grid-cols-5 gap-6 grid-cols-2">
          <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
            <h1 className="text-lg">Real Feel</h1>
            <h1 id="realFeel" className="text-3xl allEM:text-2xl allT:text-xl">
              - -
            </h1>
          </div>
          <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
            <h1 className="text-lg">Visibility</h1>
            <h1
              id="visibility"
              className="text-3xl allEM:text-2xl allT:text-xl"
            >
              - -
            </h1>
          </div>
          <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
            <h1 className="text-lg">Humidity</h1>
            <h1 id="humidity" className="text-3xl allEM:text-2xl allT:text-xl">
              - -
            </h1>
          </div>
          <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
            <h1 className="text-lg">Pressure</h1>
            <h1 id="pressure" className="text-3xl allEM:text-2xl allT:text-xl">
              - -
            </h1>
          </div>
          <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
            <h1 className="text-lg">Wind Direction</h1>
            <h1
              id="windDirection"
              className="text-3xl allEM:text-2xl allT:text-xl"
            >
              - -
            </h1>
          </div>
          <div className="flex flex-col justify-center p-4 border shadow-2xl h-44 rounded-3xl allT:h-40">
            <h1 className="text-lg">Sunset</h1>
            <h1 id="sunset" className="text-3xl allEM:text-2xl allT:text-xl">
              - -
            </h1>
            <br />
            <h1 className="text-lg">Sunrise</h1>
            <h1 id="sunrise" className="text-3xl allEM:text-2xl allT:text-xl">
              - -
            </h1>
          </div>
        </section>
      </section>
    );
  }

  const accurateDate = new Date();

  const timeStamps = hourlyData.hourly.time;
  const realFeel = hourlyData.hourly.apparent_temperature;
  const visibility = hourlyData.hourly.visibility;
  const humidity = hourlyData.hourly.relativehumidity_2m;
  const pressure = hourlyData.hourly.pressure_msl;
  const windDirection = hourlyData.hourly.winddirection_80m;

  const sunrise = hourlyData.daily.sunrise;
  const sunset = hourlyData.daily.sunset;

  return (
    <section className="flex flex-col justify-between w-full space-y-6 xl:space-y-0 xl:gap-6 h-fit">
      <h1 className="flex items-center justify-between gap-4 text-3xl">
        Air Conditions
        <span className="flex items-center gap-2 text-base">
          scroll down <FaArrowDown />
        </span>
      </h1>

      <section className="xl:h-[80%] grid xl:grid-cols-4 h-fit md:grid-cols-3 xs:grid-cols-1 2xl:grid-cols-5 gap-6 grid-cols-2">
        {timeStamps.map((time, index) => {
          const splitDate = time.split("T");

          const furtherSplitDate = splitDate[0].split("-");
          const furtherSplitTime = splitDate[1].split(":");

          if (
            furtherSplitDate[2] == accurateDate.getDate() &&
            furtherSplitTime[0] == accurateDate.getHours()
          ) {
            return (
              <React.Fragment key={time}>
                <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
                  <h1 className="text-lg">Real Feel</h1>
                  <h1
                    id="realFeel"
                    className="text-3xl allEM:text-2xl allT:text-xl"
                  >
                    {realFeel[index] + "°"}
                  </h1>
                </div>
                <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
                  <h1 className="text-lg">Visibility</h1>
                  <h1
                    id="visibility"
                    className="text-3xl allEM:text-2xl allT:text-xl"
                  >
                    {visibility[index] / 1000 + "Km"}
                  </h1>
                </div>
                <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
                  <h1 className="text-lg">Humidity</h1>
                  <h1
                    id="humidity"
                    className="text-3xl allEM:text-2xl allT:text-xl"
                  >
                    {humidity[index] + "%"}
                  </h1>
                </div>
                <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
                  <h1 className="text-lg">Pressure</h1>
                  <h1
                    id="pressure"
                    className="text-3xl allEM:text-2xl allT:text-xl"
                  >
                    {pressure[index] + "hPa"}
                  </h1>
                </div>
                <div className="flex flex-col justify-end h-40 p-4 border shadow-2xl md:min-h-[176px] rounded-3xl xs:h-32">
                  <h1 className="text-lg">Wind Direction</h1>
                  <h1
                    id="windDirection"
                    className="text-3xl allEM:text-2xl allT:text-xl"
                  >
                    {windDirection[index] + "°"}
                  </h1>
                </div>
              </React.Fragment>
            );
          }
        })}

        <div className="flex flex-col justify-center p-4 border shadow-2xl h-44 rounded-3xl allT:h-40">
          <h1 className="text-lg">Sunset</h1>
          <h1 id="sunset" className="text-3xl allEM:text-2xl allT:text-xl">
            {sunset.map((set) => {
              const splitDate = set.split("T");
              const furtherSplitDate = splitDate[0].split("-");

              if (
                furtherSplitDate[2] == accurateDate.getDate() &&
                furtherSplitDate[1] == accurateDate.getMonth() + 1
              ) {
                return splitDate[1];
              }
            })}
            <span className="text-2xl">PM</span>
          </h1>
          <br />
          <h1 className="text-lg">Sunrise</h1>
          <h1 className="text-3xl allEM:text-2xl allT:text-xl">
            {sunrise.map((rise) => {
              const splitDate = rise.split("T");
              const furtherSplitDate = splitDate[0].split("-");

              if (
                furtherSplitDate[2] == accurateDate.getDate() &&
                furtherSplitDate[1] == accurateDate.getMonth() + 1
              ) {
                return splitDate[1];
              }
            })}
            <span className="text-2xl">AM</span>
          </h1>
        </div>
      </section>
    </section>
  );
};

export default HourlyInfo;
