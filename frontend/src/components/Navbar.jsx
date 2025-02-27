import React, { useState, useEffect } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  setCategory,
  setSearchSuggestion,
} from "../redux/appSlice";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const { searchSuggestion } = useSelector((store) => store.app);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };

  const searchVideo = () => {
    dispatch(setCategory(input));
    setInput("");
  };

  const showSuggestion = async () => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${input}`
      );

      console.log("search", res);
      dispatch(setSearchSuggestion(res?.data[1]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showSuggestion();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-700 text-white shadow-md fixed w-full top-0 z-20">
      {/* Left: Logo & Menu Icon */}
      <div className="flex items-center gap-1 md:gap-4">
        <FiAlignJustify
          onClick={toggleHandler}
          size={26}
          className="cursor-pointer hover:text-gray-400"
        />

        <NavLink to={"/"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/YouTube_2024.svg/230px-YouTube_2024.svg.png"
            alt="logo"
            className="w-24 md:w-28"
          />
        </NavLink>
      </div>

      {/* Center: Search Bar */}
      <div className="flex md:flex items-center w-[40%] bg-gray-800 rounded-full border border-gray-600 overflow-hidden">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full px-1 py-1 md:px-4 md:py-2 bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button
          onClick={searchVideo}
          className="px-2 py-1 md:px-4 md:py-2 border-l-1 border-gray-600 hover:bg-gray-600 transition duration-400"
        >
          <CiSearch size={24} />
        </button>
      </div>

      {/* Suggestions Box */}
      {suggestion && searchSuggestion.length !== 0 && (
        <div className="absolute top-3 z-50 w-[30%] py-5 bg-white shadow-lg mt-12 rounded-lg border border-gray-200">
          <ul>
            {searchSuggestion.map((text, idx) => (
              <div
                key={idx}
                className="flex items-center px-4 hover:bg-gray-100"
              >
                <CiSearch size="24px" />
                <li className="px-2 py-1 cursor-pointer text-md font-medium">
                  {text}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}

      {/* Right: Icons & Avatar */}
      <div className="relative flex items-center gap-1 md:gap-5">
        <NavLink to={"/upload"}>
          <RiVideoAddLine
            size={24}
            className="hidden text-gray-300 md:block cursor-pointer hover:text-gray-400"
          />
        </NavLink>
        <IoMdNotifications
          size={24}
          className="cursor-pointer hover:text-gray-400"
        />

        {/* Avatar with Dropdown */}
        <div className="relative dropdown">
          <Avatar
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?w=768"
            size={36}
            round
            className="cursor-pointer sm:size-28 size-20"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-900 font-semibold rounded-md shadow-lg overflow-hidden">
              <ul className="py-2 ">
                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                  Profile
                </li>
                <NavLink to={"/login"}>
                  <li className="px-4 py-2 hover:bg-gray-800 text-green-400  cursor-pointer">
                    Login
                  </li>
                </NavLink>
                <li className="px-4 py-2 hover:bg-gray-800 text-red-400 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
