import Main from "@/components/Main/Main";
import Nav from "@/components/Nav";
import DayForecast from "@/components/DayForecast";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocalStorage, useSessionStorage } from "react-use";
import { useQueryClient } from "react-query";
import Splash from "@/components/Splash-Screen/Splash";
import Loading from "react-loading";

export default function Home() {
  const [supported, setSupported] = useState(true);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [confirmed, setConfirmed] = useLocalStorage("confirmed");
  const [splashed, setSplashed] = useSessionStorage("splashed");
  const [askUser, setAskUser] = useState(null);
  const queryClient = useQueryClient();
  const weatherInfo = queryClient.getQueryData("weatherInfo");

  const handleLocationClick = () => {
    setConfirmed("true");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => setSplashed("true"), 5500);

    if (!navigator.geolocation) {
      setSupported(false);
    }

    setAskUser(true);

    if (confirmed === "true") {
      if (!weatherInfo) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation(position.coords);
          },
          (error) => {
            setSupported(false);
          }
        );
      }

      setAskUser(false);
    }

    window.addEventListener("beforeunload", () => {
      setSplashed("");
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("beforeunload", () => {
        setSplashed("");
      });
    };
  }, [confirmed, setSplashed, weatherInfo]);

  async function fetchData(location) {
    const rawData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,pressure_msl,visibility,windspeed_80m,winddirection_80m&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&windspeed_unit=ms&timezone=auto`
    );
    const jsonData = rawData.json();
    return jsonData;
  }

  const { isError, isLoading, data } = useQuery(
    "weatherInfo",
    () => fetchData(location),
    {
      enabled: !!location,
      staleTime: 300000,
    }
  );

  if (isLoading) {
    if (loading === null) {
      setLoading(true);
    }
  }

  if (data) {
    if (loading === true) {
      setLoading(null);
    }
  }

  if (isError) {
    if (error === null) {
      setError(true);
      setLoading(null);
      setLocation(null);
    }
  }

  return (
    <>
      <Head>
        <title>Greezy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`bg-[#262626] ${
          askUser || splashed !== "true" || loading || error || !supported
            ? "overflow-hidden h-screen"
            : ""
        }`}
      >
        <div className="flex flex-col w-full min-h-[100dvh] xl:h-screen gap-12 p-4 pt-8 xl:pt-4 xl:flex-row xl:gap-8">
          <Nav />
          <Main />
          <DayForecast />
        </div>
      </main>

      {splashed !== "true" ? <Splash /> : ""}

      {!supported && (
        <div className="absolute top-0 left-0 z-20 flex flex-col gap-6 items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
          <h1 className="text-2xl text-center md:text-4xl">
            Geolocation is not active / supported
          </h1>
          <p className="text-center w-[95%] max-w-lg">
            Please check your settings and allow location access for this
            website or check your internet connectivity and make sure you are
            connected. If after confirming all these, it still doesn&apos;t
            work, then geolocation is NOT supported by the browser you are
            currently using.
          </p>
          <div className="flex gap-6 xs:flex-col">
            <Link
              href={"/cities"}
              className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
            >
              Search for cities
            </Link>
            <button
              className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      )}

      {askUser && (
        <div className="absolute top-0 left-0 z-20 flex flex-col gap-6 items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
          <h1 className="w-[90%] text-2xl text-center md:text-4xl">
            We need your location 👉👈
          </h1>
          <p className="text-center w-[95%] max-w-sm">
            In order to display accurate weather information for you, our
            website would need to access your location
          </p>
          <div className="flex gap-6">
            <Link
              className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
              href={"/cities"}
            >
              Deny
            </Link>
            <button
              className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
              onClick={handleLocationClick}
            >
              Allow
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
          <h1 className="flex items-center justify-center gap-2 text-2xl text-center xs:flex-col md:text-3xl">
            Getting weather information
            <Loading
              type="spinningBubbles"
              color="#fff"
              height={50}
              width={50}
            />
          </h1>
        </div>
      )}

      {error && (
        <div className="absolute top-0 left-0 z-20 flex flex-col gap-6 items-center justify-center w-full h-full text-white backdrop-brightness-[10%]">
          <h1 className="text-2xl text-center md:text-3xl">
            An error occurred
          </h1>
          <p className="text-center w-[95%] max-w-lg">
            A server error occurred, try reloading the browser and check to make
            sure that you are connected to a functioning internet connection. If
            the error persists, please contact my developers for more info and a
            possible resolution of the error.
          </p>
          <div className="flex gap-6 xs:flex-col">
            <Link
              href={"/cities"}
              className="px-8 py-2 text-black duration-300 bg-white border rounded-lg hover:bg-black hover:text-white"
            >
              Search for cities
            </Link>
            <button
              className="px-8 py-2 text-black duration-300 bg-white rounded-lg hover:bg-black hover:text-white"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      )}
    </>
  );
}
