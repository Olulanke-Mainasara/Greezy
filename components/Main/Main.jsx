import React from 'react'
import QuickInfo from './QuickInfo';
import TodayInfo from './TodayInfo';
import HourlyInfo from './HourlyInfo';

const Main = () => {
  return (
    <section className="block w-full h-full grid-rows-3 gap-10 space-y-10 overflow-y-scroll text-white grow xl:w-3/5 xl:grid hideScroll xl:pb-0 xl:space-y-0">
      <QuickInfo />
      <TodayInfo />
      <HourlyInfo />
    </section>
  );
}

export default Main