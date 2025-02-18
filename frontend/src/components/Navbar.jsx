import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-700 text-white shadow-md">
      
      {/* Left: Logo & Menu Icon */}
      <div className="flex items-center gap-1 md:gap-4">
        <FiAlignJustify size={26} className="cursor-pointer hover:text-gray-400" />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/YouTube_2024.svg/230px-YouTube_2024.svg.png"
          alt="logo"
          className="w-24 md:w-28"
        />
      </div>

      {/* Center: Search Bar */}
      <div className="flex md:flex items-center w-[40%] bg-gray-800 rounded-full border border-gray-600 overflow-hidden">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-1 py-1 md:px-4 md:py-2 bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button className=" px-2 py-1 md:px-4 md:py-2 border-l-1 border-gray-600 hover:bg-gray-600 transition duration-400">
        <CiSearch size={24} />
        </button>
     
      </div>

      {/* Right: Icons & Avatar */}
      <div className="flex items-center gap-1 md:gap-5">
        <RiVideoAddLine size={24} className=" hidden  md:block cursor-pointer hover:text-gray-400" />
        <IoMdNotifications size={24} className="cursor-pointer hover:text-gray-400" />
        <Avatar
          src="https://www.onthisday.com/images/people/cristiano-ronaldo.jpg?w=360"
          size={36}
          round
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
