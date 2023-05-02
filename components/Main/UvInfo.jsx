import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocalStorage } from "react-use";

const UvInfo = () => {
  const [location, setLocation] = useState(null);
  const [confirmed] = useLocalStorage("confirmed");
  const queryClient = useQueryClient();
  const uvInfo = queryClient.getQueryData("uvInfo");

  useEffect(() => {
    if (confirmed === "true") {
      if (!uvInfo) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation(position.coords);
        });
      }
    }
  });

  const getUvInfo = async (l) => {
    try {
      let myHeaders = new Headers();
      myHeaders.append("x-access-token", process.env.NEXT_PUBLIC_UV_API_KEY);
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const rawData = await fetch(
        `https://api.openuv.io/api/v1/uv?lat=${l.latitude}&lng=${l.longitude}&alt=100`,
        requestOptions
      );
      const jsonData = await rawData.json();
      const uvNumber = Math.round(jsonData.result.uv);

      let uvText = null;
      if (uvNumber <= 2) {
        uvText = "Low";
      } else if (uvNumber >= 3 && uvNumber <= 5) {
        uvText = "Moderate";
      } else if (uvNumber >= 6 && uvNumber <= 8) {
        uvText = "High";
      } else if (uvNumber >= 9 && uvNumber <= 10) {
        uvText = "Very high";
      } else if (uvNumber >= 11) {
        uvText = "Extreme";
      }

      return { uvNumber: uvNumber, uvText: uvText };
    } catch (error) {
      console.log(error.message);
      return { uvNumber: "- -", uvText: "API quota 😔" };
    }

    return uvInfo;
  };

  const { isError, isLoading, data } = useQuery(
    "uvInfo",
    () => getUvInfo(location),
    {
      enabled: !!location,
      staleTime: 300000,
    }
  );

  if (isLoading) {
    return (
      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 className="text-xl">U.V Index</h1>
        <h1 id="uvIndex" className="text-5xl sm:text-7xl">
          - -
        </h1>
        <h1 id="exposureLevel" className="text-xl">
          Loading...
        </h1>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 className="text-xl">U.V Index</h1>
        <h1 id="uvIndex" className="text-5xl sm:text-7xl">
          - -
        </h1>
        <h1 id="exposureLevel" className="text-xl">
          Server error
        </h1>
      </section>
    );
  }

  if (data) {
    return (
      <section className="flex flex-col items-center border shadow-2xl rounded-3xl justify-evenly md:h-48 h-44 xl:h-full">
        <h1 className="text-xl">U.V Index</h1>
        <h1 id="uvIndex" className="text-5xl sm:text-7xl">
          {data.uvNumber}
        </h1>
        <h1 id="exposureLevel" className="text-xl">
          {data.uvText}
        </h1>
      </section>
    );
  }
};

export default UvInfo;
