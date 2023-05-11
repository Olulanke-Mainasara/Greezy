import React from "react";
import Loading from "react-loading";

const Recalculating = () => {
  return (
    <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
      <h1 className="flex items-center justify-center gap-2 text-2xl text-center xs:flex-col md:text-3xl">
        Recalculating
        <Loading type="spinningBubbles" color="#fff" height={50} width={50} />
      </h1>
    </div>
  );
};

export default Recalculating;
