import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { removeImageBG } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
      {/* left side */}
      <div className="">
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          Remove the <br className="max-md:hidden" />{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
            background{" "}
          </span>{" "}
          from
          <br className="max-md:hidden" /> your images free.
        </h1>
        <p className="my-4 text-[15px] text-neutral-600">
          Say Goodbye to Distractions: AI-Powered Background Removal for
          Stunning Images
        </p>
        <div className="">
          <input
            onChange={(e) => removeImageBG(e.target.files[0])}
            type="file"
            id="upload1"
            accept="image/*"
            className="hidden"
          />
          <label
            htmlFor="upload1"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 rounded-full text-white cursor-pointer hover:scale-105 transition-all duration-700"
          >
            <img src={assets.upload_btn_icon} alt="" width={20} />
            <p className="text-sm">Upload Image</p>
          </label>
        </div>
      </div>

      {/* right side */}
      <div className="w-full max-w-md">
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
