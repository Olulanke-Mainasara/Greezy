import React from "react";
import { motion } from "framer-motion";
import { FaWind } from "react-icons/fa";

function SplashText() {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.h1
        initial={{ height: "auto" }}
        animate={{
          height: 0,
          paddingBottom: 0,
          transition: { duration: 1.3, delay: 2, ease: "anticipate" },
        }}
        className="md:text-[200px] text-white shadows text-9xl xs:text-8xl flex items-center overflow-hidden pb-5"
      >
        G
        <FaWind className="md:text-[165px] text-[103px] xs:text-[75px]" />
      </motion.h1>

      <motion.div
        animate={{
          rotate: "-90deg",
          transition: { duration: 1.3, delay: 3.5, ease: "anticipate" },
        }}
        className="md:w-[500px] h-7 md:h-10 border rounded-full overflow-hidden w-[350px] xs:w-64"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: "100%",
            transition: { duration: 1.3, delay: 2, ease: "anticipate" },
          }}
          className="w-full h-full bg-white"
        ></motion.div>
      </motion.div>
    </div>
  );
}

export default SplashText;
