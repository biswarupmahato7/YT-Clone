import React, { useEffect, useState } from "react";
import axios from "axios";
import { YT_VIDEO_API, API_KEY } from "../config/config.js";
import VideoCart from "./VideoCart.jsx";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [video, setVideo] = useState([]);
  const fetchVideo = async () => {
    try {
      const res = await axios.get(`${YT_VIDEO_API}`);
      // console.log(res);
      //console.log(res?.data?.items);
      setVideo(res?.data?.items);
    } catch (error) {
      console.log("Error Fetching Videos: ", error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <div className="">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {video.map((item) => {
          console.log(item.id)
          return (
            <Link to={`/watch?v=${item.id}`} key={item.id}>
              <VideoCart item={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VideoContainer;
