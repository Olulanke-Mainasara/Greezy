import React from 'react'

const DayForecast = () => {
  return (
    <section className="xl:w-[30%] h-full rounded-3xl flex flex-col gap-6 px-7 py-7 shadow-2xl text-white background">
      <h1 className="text-3xl">7 - Day Forecast</h1>

      <section
        id="dayForecasts2"
        className="flex flex-col w-full h-full overflow-hidden"
      ></section>
    </section>
  );
}

export default DayForecast