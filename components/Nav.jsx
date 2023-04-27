import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="background xl:border xl:h-full xl:w-[8%] z-10 xl:rounded-3xl flex xl:flex-col xl:justify-between items-center xl:py-8 xl:shadow-2xl fixed bottom-0 left-0 xl:static w-screen border-t border-white h-[8%] xs:justify-between">
      <Link
        href="#"
        className="hidden text-5xl text-white duration-300 xs:text-4xl xl:hover:text-black hover:text-white xl:block"
      >
        G<i className="fa-solid fa-wind text-[41px] allT:text-[31px]"></i>
      </Link>

      <ul className="flex items-center justify-around text-white xl:flex-col gap-11 2xl:gap-20">
        <li>
          <button
            title="Weather"
            className="xl:w-[51px] xl:h-[51px] xl:rounded-full xl:hover:bg-black duration-500 flex items-center justify-center w-auto h-auto hover:bg-transparent"
          >
            <i className="text-xl fa-solid fa-cloud">a</i>
          </button>
        </li>

        <li>
          <button
            title="Cities"
            className="xl:w-[51px] xl:h-[51px] xl:rounded-full xl:hover:bg-black duration-500 flex items-center justify-center w-auto h-auto hover:bg-transparent"
          >
            <i className="text-xl fa-solid fa-city">b</i>
          </button>
        </li>
        
        <li className="hidden text-center md:block md:text-sm">©Greezy <br/> 2023</li>
      </ul>
    </nav>
  );
};

export default Nav;
