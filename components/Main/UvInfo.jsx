import React, { useState, useEffect } from "react";

const UvInfo = () => {
  const [uvIndex, setUvIndex] = useState(null);
  const [exposureLevel, setExposureLevel] = useState(null);

  const getUvInfo = async () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", process.env.NEXT_PUBLIC_UV_API_KEY);
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const rawData = await fetch(
      "https://api.openuv.io/api/v1/uv?lat=6.62&lng=3.38&alt=100",
      requestOptions
    );
    const jsonData = await rawData.json();
    const uv = jsonData.result.uv;

    setUvIndex(Math.round(uv));
  };

  const getExposureLevel = (uv) => {
    if (uv === null) {
      setExposureLevel("Loading...");
    } else if (uv <= 2) {
      setExposureLevel("Low");
    } else if (uv >= 3 && uv <= 5) {
      setExposureLevel("Moderate");
    } else if (uv >= 6 && uv <= 8) {
      setExposureLevel("High");
    } else if (uv >= 9 && uv <= 10) {
      setExposureLevel("Very High");
    } else if (uv >= 11) {
      setExposureLevel("Extreme");
    }
  };


  useEffect(() => {
    getUvInfo();
    getExposureLevel(uvIndex);
  }, [uvIndex]);

  return (
    <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
      <h1 className="text-xl">U.V Index</h1>
      <h1 id="uvIndex" className="text-5xl sm:text-7xl">
        {uvIndex === null ? "- -" : uvIndex}
      </h1>
      <h1 id="exposureLevel" className="text-xl">
        {exposureLevel}
      </h1>
    </section>
  );
};

export default UvInfo;
