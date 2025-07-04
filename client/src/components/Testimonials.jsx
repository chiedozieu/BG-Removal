import React from "react";
import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div>
      {/* title */}
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 via-gray-500 to-gray-300 bg-clip-text text-transparent py-5">
        Customer Testimonials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-700"
          >
            <p className="text-4xl text-gray-500"> 〞</p>
            <p className="text-sm text-gray-500">{testimonial.text}</p>
            <div className="flex items-center gap-3 mt-5">
              <img src={testimonial.image} alt="" className="size-9 rounded-full" />
              <div className="">
                <p className="text-slate-800">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
