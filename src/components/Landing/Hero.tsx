'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DefaultButton from "../microComponents/DefaultButton";

const backgroundImages = ["/hero/img1.jpg", "/hero/img2.jpg", "/hero/img3.jpg", "/hero/img4.jpg"];
const intervalDuration = 4000; // 4 seconds

const scrollDown = () => {
  const element = document.getElementById("photoShoots");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, intervalDuration);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 1}}} className="relative">
      <div
        className="parallax transition-all duration-1000 ease-in-out min-h-[60vh] lg:min-h-[100vh]"
        style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
      />
      <div className="absolute top-1/2 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-heading flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap">
          <div>
              <span className="text-xl lg:text-4xl font-extralight">寿司屋</span>
          </div>
          <div className="flex flex-col text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9em] tracking-[-1px] sm:tracking-[-2px] lg:tracking-[-5px]">
              <span>The best <i>rolls</i></span>
              <span>for your best moments</span>
          </div>
        </div>
        <DefaultButton text="more info" />
      </div>
      <div onClick={scrollDown} className="absolute bottom-10 left-1/2 rotate-90 cursor-pointer hover:opacity-80 transition-opacity duration-700">
        <svg width="8" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.3 26"><path className="md-top-slider__nav-arrow-down-svg-color" fill="#fff" d="M1.81 0L0 1.83 10.74 13l-1.15 1.21-9.53 9.94L1.84 26 14.3 13z"></path></svg>
      </div>
    </motion.div>
  );
}
