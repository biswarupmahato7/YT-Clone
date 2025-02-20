import React from "react";
import Avatar from "react-avatar";
import axios from 'axios';
// import API_KEY from '../config/config.js'
import { useState, useEffect } from "react";

const VideoCart = ({ item }) => {
  // Function to format view count
  const formatViews = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num;
  };

  const [ytIcon, setYtIcon] = useState("");
  const getYoutubeChannelName = async () =>{
      try {
          const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=AIzaSyBG7LCfuSTL6lMEqEUCs3iqm7WgQfOC7PU`)
          setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(()=>{
      getYoutubeChannelName();
  },[])

  return (
    <div className="w-full lg:w-96 xl:w-96    cursor-pointer">
      {/* Video Thumbnail */}
      <img
        className="w-full rounded-xl  h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 object-cover"
        src={item.snippet.thumbnails.high.url}
        alt={item.snippet.title}
      />

      {/* Video Info */}
      <div className="flex items-start gap-4 p-3">
        {/* Avatar */}
        <Avatar
          src={ytIcon}
          size={36}
          round
          className="cursor-pointer "
        />

        {/* Video Details */}
        <div>
          <h2 className="text-sm sm:text-lg font-semibold text-gray-300 leading-tight">
            {item.snippet.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {item.snippet.channelTitle}
          </p>
          <p className="text-xs text-gray-500">
            {formatViews(item.statistics.viewCount)} views • {item.contentDetails.duration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCart;
