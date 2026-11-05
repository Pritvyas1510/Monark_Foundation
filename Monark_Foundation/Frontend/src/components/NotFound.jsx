// src/components/NotFound.jsx

import { Link } from "react-router-dom";
import { FaHome, FaHeadset, FaSearch } from "react-icons/fa";
import Logo from "../../Public/Image/Logo.png";

const NotFound = () => {
  return (
    <div className="h-screen overflow-hidden bg-[#f8f9fb] flex items-center justify-center px-4">
      <div className="text-center max-w-3xl w-full">
        {/* 404 SECTION */}
        <div className="relative flex items-center justify-center gap-6 mb-8">
          {/* Left 4 */}
          <span className="text-[110px] md:text-[170px] font-extrabold text-orange-500 leading-none">
            4
          </span>

          {/* Center Circle */}
          <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-orange-200">
            <img
              src={Logo}
              alt="Logo"
              className="w-20 md:w-52 object-contain"
            />

            {/* Search Icon */}
            <div className="absolute -bottom-3 -right-3 bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
              <FaSearch />
            </div>
          </div>

          {/* Right 4 */}
          <span className="text-[110px] md:text-[170px] font-extrabold text-orange-500 leading-none">
            4
          </span>
        </div>

        {/* TEXT CONTENT */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! This page seems to have wandered off.
        </h1>

        <p className="text-gray-500 text-base md:text-lg mb-10">
          Don’t worry, even the best explorers lose their way sometimes.
          <br />
          Let’s get you back on track.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
           to="/"

            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition duration-300"
          >
            <FaHome />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
