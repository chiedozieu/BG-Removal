import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-44">
      <Link to="/"><img width={150} src={assets.logo} alt="" /></Link>
      <p className="text-sm pl-4 max-sm:hidden text-gray-500">
        Copyright @Nabata | All rights reserved
      </p>
      <div className="flex items-center gap-1">
        <img className="size-10" src={assets.facebook_icon} alt="" />
        <img className="size-10" src={assets.twitter_icon} alt="" />
        <img className="size-10" src={assets.google_plus_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
