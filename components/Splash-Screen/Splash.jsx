import { motion } from "framer-motion";
import React from "react";

import SplashText from "./SplashText";

function Splash() {
  return (
    <motion.div
      animate={{
        top: "-100%",
        transition: { duration: 0.5, delay: 4.8, ease: "easeInOut" },
      }}
      className="w-screen h-screen bg-[#262626] absolute top-0 left-0 flex items-center justify-center z-30 overflow-hidden"
    >
      <SplashText />
    </motion.div>
  );
}

export default Splash;
