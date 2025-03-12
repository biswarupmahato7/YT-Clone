import React from "react";
import { IoHome } from "react-icons/io5";
import { SiYoutubeshorts, SiYoutubemusic } from "react-icons/si";
import { MdSubscriptions, MdAccountCircle, MdHistory } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { RiPlayList2Fill } from "react-icons/ri";
import { BiSolidVideos } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/appSlice";
import { NavLink } from "react-router-dom";
import { MdOutlinePlaylistPlay } from "react-icons/md";  
import { FaFire } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const Sidebar = () => {
  const dispatch = useDispatch();
  const open = useSelector((store) => store.app.open);
  console.log("Sidebar open:", open);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-md"
      >
        Toggle
      </button>

      {/* Desktop Sidebar */}
      <div
        className={`hidden relative left-0 h-[100vh] overflow-y-scroll text-gray-200 px-4 py-6 transition-all duration-300 
        ${open ? "md:flex w-[12%]" : "md:w-[5%]"} 
        md:flex-col md:ml-2 lg:w-[12%] [&::-webkit-scrollbar]:hidden 
        [-ms-overflow-style:'none'] [scrollbar-width:'none'] `}
      >
        {[
          { icon: <IoHome size={24} />, label: "Home" },
          { icon: <SiYoutubeshorts size={24} />, label: "Shorts" },
          { icon: <MdSubscriptions size={24} />, label: "Subscriptions" },
          { icon: <SiYoutubemusic size={24} />, label: "YouTube Music" },
          { icon: <GoDownload size={24} />, label: "Download" },
          { icon: <MdAccountCircle size={24} />, label: "You" },
          { icon: <MdHistory size={24} />, label: "History" },
          { icon: <RiPlayList2Fill size={24} />, label: "Playlist" },
          { icon: <BiSolidVideos size={24} />, label: "Watch Later" },
          { icon: <AiFillLike size={24} />, label: "Liked Videos" },
          { icon: <MdOutlinePlaylistPlay  size={24}/>, label: "Watch List" },
          { icon: <FaFire  size={24} />, label: "Top Video" },
          { icon: <IoSettingsOutline size={24} />, label: "Setting" },
          { icon: <IoIosHelpCircleOutline size={24}/>, label: "Help" },
          { icon: <MdOutlineFeedback size={24} />, label: "Feedback" },
          { icon: <MdOutlineReportGmailerrorred  size={24}/>, label: "Report" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex md:flex-col xl:flex-row md:gap-5 items-center mb-4 hover:bg-gray-700 transition duration-200 py-2 rounded-xl cursor-pointer"
          >
            {item.icon}
            <p className={`${open ? "block" : "hidden"} md:block lg:block`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 flex items-center justify-around text-gray-300 py-3 md:hidden border-t border-gray-700">
        {[
          { icon: <NavLink to={"/"}><IoHome className="text-gray-300" size={24} /></NavLink>, label: "Home" },
          { icon: <SiYoutubeshorts size={24} />, label: "Shorts" },
          { icon: <MdSubscriptions size={24} />, label: "Subs" },
          { icon: <NavLink to={"https://music.youtube.com/"}><SiYoutubemusic className="text-gray-300" size={24} /></NavLink>, label: "Music" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer hover:text-white">
            {item.icon}
            <p className="text-xs">{item.label}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
