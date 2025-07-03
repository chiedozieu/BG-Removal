import React from "react";
import { assets } from "../assets/assets";

const Upload = () => {
  return (
    <div className="pb-16">
      {/* title */}
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 via-gray-500 to-gray-300 bg-clip-text text-transparent py-6 md:py-16">
        Experience the power. Try now!
      </h1>
      <div className="text-center mb-24">
                <input type="file" id="upload2" className="hidden" />
                <label htmlFor="upload2" className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 rounded-full text-white cursor-pointer hover:scale-105 transition-all duration-700">
                  <img src={assets.upload_btn_icon} alt="" width={20} />
                  <p className="text-sm">Upload Image</p>
                </label>
              </div> 
    </div>
  );
};

export default Upload;
