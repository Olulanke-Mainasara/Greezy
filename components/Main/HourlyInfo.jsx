import React from "react";

const HourlyInfo = () => {
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
          <h1 id="visibility" className="text-3xl allEM:text-2xl allT:text-xl">
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
};

export default HourlyInfo;
