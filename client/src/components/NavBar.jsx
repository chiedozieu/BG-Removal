import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const NavBar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  return (
    <div className="flex justify-between items-center py-3 mx-4 lg:mx-20">
      <Link to="/">
        <img className="w-32 sm:w-44" src={assets.logo} alt="" />
      </Link>
     {
       isSignedIn ? (
      <div className="">
        <UserButton />
      </div>
      ) : (
      <button
        onClick={() => openSignIn({})}
        className="bg-black text-white py-2 px-4 rounded-full flex items-center gap-4 cursor-pointer hover:scale-105 transition-all duration-700"
      >
        Get Started{" "}
        <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="" />
      </button>
      )
      }
    </div>
  );
};

export default NavBar;
