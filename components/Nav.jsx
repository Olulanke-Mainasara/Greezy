import Link from "next/link";
import React from "react";
import { FaCloud, FaSearch, FaWind } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="background xl:border xl:h-full xl:w-[8%] z-10 xl:rounded-3xl flex xl:flex-col xl:justify-between items-center xl:py-8 xl:shadow-2xl fixed bottom-0 left-0 xl:static w-screen border-t border-white h-[8%] min-h-[50px] max-h-[70px] xl:max-h-full xs:justify-between">
      <Link
        href={"/"}
        className="items-center hidden text-5xl text-white duration-300 xl:flex xs:text-4xl xl:hover:text-black hover:text-white"
      >
        G<FaWind />
      </Link>

      <ul className="flex items-center justify-around w-full text-white xl:flex-col gap-11 2xl:gap-20">
        <li>
          <Link
            href={"/"}
            title="Weather"
            className="xl:w-[51px] xl:h-[51px] xl:rounded-full xl:hover:bg-black duration-500 flex items-center justify-center w-auto h-auto hover:bg-transparent"
          >
            <FaCloud className="text-2xl" />
          </Link>
        </li>

        <li>
          <Link
            href={"/cities"}
            title="Cities"
            className="xl:w-[51px] xl:h-[51px] xl:rounded-full xl:hover:bg-black duration-500 flex items-center justify-center w-auto h-auto hover:bg-transparent"
          >
            <FaSearch className="text-2xl" />
          </Link>
        </li>

        <li className="hidden text-sm text-center xl:block">
          ©Greezy <br /> 2023
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
