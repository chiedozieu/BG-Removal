import React, { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };
  return (
    <div className="pb-10 md:py-20 mx-2">
      <h1 className="capitalize text-2xl text-center md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 via-gray-500 to-gray-300 bg-clip-text text-transparent mb-12 sm:mb-20">
        Remove Backgrounds in Seconds <br className="" /> with high-quality
        results
      </h1>
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl">
        {/* background image */}
        <img
          className=""
          src={assets.image_w_bg}
          alt=""
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
        />
        {/* foreground image */}
        <img
          className="absolute top-0 left-0 w-full h-full"
          src={assets.image_wo_bg}
          alt=""
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        />
        {/* slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full slider cursor-pointer"
          style={{
            WebkitAppearance: "none",
            height: "100%",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default BgSlider;
