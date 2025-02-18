import React from "react";
import { IoHome } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar (Visible on md & larger screens) */}
      <div className="hidden md:flex flex-col text-gray-200  md:w-[10%] lg:w-[12%] px-4 py-6">
        {[
          { icon: <IoHome size={24} />, label: "Home" },
          { icon: <SiYoutubeshorts size={24} />, label: "Shorts" },
          { icon: <MdSubscriptions size={24} />, label: "Subscriptions" },
          { icon: <SiYoutubemusic size={24} />, label: "YouTube Music" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex gap-5 items-center mb-4 hover:bg-gray-700 transition duration-200 py-2 px-3 rounded-xl cursor-pointer"
          >
            {item.icon}
            <p className="hidden lg:block">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Mobile Bottom Navigation (Visible on small screens) */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 flex items-center justify-around text-gray-300 py-3 md:hidden border-t border-gray-700">
        {[
          { icon: <IoHome size={24} />, label: "Home" },
          { icon: <SiYoutubeshorts size={24} />, label: "Shorts" },
          { icon: <MdSubscriptions size={24} />, label: "Subs" },
          { icon: <SiYoutubemusic size={24} />, label: "Music" },
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
