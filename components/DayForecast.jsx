import React from 'react'

const DayForecast = () => {
  return (
    <section class="xl:w-[30%] h-full rounded-3xl flex flex-col gap-6 px-7 py-7 shadow-2xl text-white background">
      <h1 class="text-3xl">7 - Day Forecast</h1>

      <section
        id="dayForecasts2"
        class="w-full h-full overflow-hidden flex flex-col"
      ></section>
    </section>
  );
}

export default DayForecast