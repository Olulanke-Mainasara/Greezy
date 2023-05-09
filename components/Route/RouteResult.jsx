import React from "react";

const RouteResult = ({ route }) => {
  return (
    <article className="flex w-full mx-auto text-white border-t h-72">
      <div className="relative w-8">
        <div className="w-[1px] h-full bg-white"></div>
        <div className="absolute w-8 -translate-y-1/2 bg-white rounded-full aspect-square top-1/2 -left-1/2"></div>
      </div>

      <div className="flex flex-col w-full pl-3 justify-evenly">
        <h1 className="text-xl">Distance: {route.distance}m</h1>
        <h1 className="text-3xl">{route.instruction}</h1>
        <h1 className="text-xl">Duration: {route.duration}mins</h1>
      </div>
    </article>
  );
};

export default RouteResult;
