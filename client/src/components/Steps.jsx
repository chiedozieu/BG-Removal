import React from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-30 py-20 xl:py-40">
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 via-gray-500 to-gray-300 bg-clip-text text-transparent ">
        Remove background image in <br /> 3 easy steps
      </h1>
      <div className="flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center">
        <div className="flex items-start bg-white gap-4 border border-gray-200 drop-shadow-md p-7 pb-10 rounded-md hover:scale-105 transition-all duration-500">
          <img src={assets.upload_icon} alt="" className="max-w-9" />
          <div className="">
            <p className="text-xl font-medium text-gray-800">
              Upload your image
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              The app will automatically remove <br />
              the background
            </p>
          </div>
        </div>

        <div className="flex items-start bg-white gap-4 border border-gray-200 drop-shadow-md p-7 pb-10 rounded-md hover:scale-105 transition-all duration-500">
          <img src={assets.remove_bg_icon} alt="" className="max-w-9" />
          <div className="">
            <p className="text-xl font-medium text-gray-800">
              Remove background
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              The app will automatically remove <br />
              the background
            </p>
          </div>
        </div>

        <div className="flex items-start bg-white gap-4  border border-gray-200 shadow-md p-7 pb-10 rounded-md hover:scale-105 transition-all duration-500">
          <img src={assets.download_icon} alt="" className="max-w-9" />
          <div className="">
            <p className="text-xl font-medium text-gray-800">Download image</p>
            <p className="text-sm text-neutral-500 mt-1">
              The app will automatically remove <br />
              the background
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
