import React from "react";
import { assets, plans } from "../assets/assets";

const BuyCredit = () => {
  return (
    <div className="min-h-[75vh] text-center pt-14 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6 hover:border-violet-500 ">
        Our Plans
      </button>
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 via-gray-500 to-gray-300 bg-clip-text text-transparent mb-6 sm:mb-10">
        Get started with the plan that's right for you.
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((plan, index) => (
          <div
            key={index}
            className=" bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-800 border-gray-200 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} width={40} alt="" />
            <p className="mt-3 font-semibold">{plan.desc}</p>
            <p className="text-sm">{plan.description}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${plan.price}</span>/
              {plan.credits}
            </p>
            <button className="w-full mt-8 py-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 text-white rounded-md min-w-52 text-sm cursor-pointer">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
