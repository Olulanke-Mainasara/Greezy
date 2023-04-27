import React from 'react'

const TodayInfo = () => {
  return (
    <section className="flex flex-col w-full space-y-6 overflow-hidden xl:space-y-0 xl:gap-6 h-fit xl:h-auto">
      <h1 className="text-3xl">Today&apos;s Forecast</h1>

      <section className="w-full h-full overflow-scroll shadow-2xl rounded-3xl hideScroll background">
        <section
          id="hourlyForecasts"
          className="flex h-48 xl:h-full w-fit"
        ></section>
      </section>
    </section>
  );
}

export default TodayInfo