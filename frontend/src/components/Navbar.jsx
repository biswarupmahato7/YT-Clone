import React, { useState, useEffect } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, setCategory, setSearchSuggestion } from "../redux/appSlice";
import { logout } from "../redux/authSlice";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const { searchSuggestion } = useSelector((store) => store.app);
  const { isAuthenticated, user } = useSelector((store) => store.auth || {});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };

  const searchVideo = () => {
    dispatch(setCategory(input));
    setInput("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) showSuggestion();
    }, 200);
    return () => clearTimeout(timer);
  }, [input]);

  const showSuggestion = async () => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${input}`
      );
      dispatch(setSearchSuggestion(res?.data[1]));
    } catch (error) {
      console.log(error);
    }
  };

  // Close dropdown on outside click
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
      <div className="flex items-center gap-1 md:gap-4">
        <FiAlignJustify onClick={toggleHandler} size={26} className="cursor-pointer hover:text-gray-400" />
        <NavLink to={"/"}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/YouTube_2024.svg/230px-YouTube_2024.svg.png" alt="logo" className="w-24 md:w-28" />
        </NavLink>
      </div>

     
      <div className="relative flex items-center w-2/5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 rounded-l-full border border-gray-500 bg-gray-800 text-white"
          placeholder="Search"
        />
        <button onClick={searchVideo} className="px-4 py-2 bg-gray-600 rounded-r-full">
          <CiSearch size={22} />
        </button>
      </div>

      {/* Profile Dropdown */}
      <div className="relative dropdown">
        <Avatar 
          src={user?.profilePic || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"}
          size={36} round className="cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)} 
        />

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-900 font-semibold rounded-md shadow-lg overflow-hidden">
            <ul className="py-2">
              {isAuthenticated ? (
                <>
                  <NavLink to={`/profile/${user?._id}`} className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                    Profile
                  </NavLink>
                  <li onClick={() => dispatch(logout())} className="px-4 py-2 hover:bg-gray-800 text-red-400 cursor-pointer">
                    Logout
                  </li>
                </>
              ) : (
                <NavLink to={"/login"} className="px-4 py-2 hover:bg-gray-800 text-green-400 cursor-pointer">
                  Login
                </NavLink>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
