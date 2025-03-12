import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import axios from "axios";

const VideoCart = ({ item }) => {
  const [ytIcon, setYtIcon] = useState("");
  const [viewCount, setViewCount] = useState(0);

  // Function to format view count
  const formatViews = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num;
  };

  const getYoutubeChannelIcon = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=AIzaSyDD5BpZSzVz_mh1w079o8sZ2mpvsa6_gt8`
      );
      setYtIcon(res.data.items[0]?.snippet?.thumbnails?.high?.url || "");
    } catch (error) {
      console.error("Error fetching channel icon:", error);
    }
  };

  const getVideoStatistics = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=AIzaSyDD5BpZSzVz_mh1w079o8sZ2mpvsa6_gt8`
      );
      setViewCount(res.data.items[0]?.statistics?.viewCount || 0);
    } catch (error) {
      console.error("Error fetching video statistics:", error);
    }
  };

  useEffect(() => {
    getYoutubeChannelIcon();
    getVideoStatistics();
  }, []);

  return (
    <div className="w-full lg:w-96 xl:w-96 no-scrollbar cursor-pointer">
      {/* Video Thumbnail */}
      <img
        className="w-full rounded-xl h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 object-cover"
        src={item.snippet.thumbnails.high.url}
        alt={item.snippet.title}
      />

      {/* Video Info */}
      <div className="flex items-start gap-4 p-3">
        {/* Avatar */}
        <Avatar src={ytIcon} size={36} round className="cursor-pointer flex-shrink-0" />

        {/* Video Details */}
        <div>
          <h2 className="text-sm sm:text-lg font-semibold text-gray-300 leading-tight">
            {item.snippet.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {item.snippet.channelTitle}
          </p>
          <p className="text-xs text-gray-500">
            {formatViews(viewCount)} views • {item.contentDetails?.duration || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCart;
