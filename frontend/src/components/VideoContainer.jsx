import React, { useEffect, useState } from "react";
import axios from "axios";
import { YT_VIDEO_API, API_KEY } from "../config/config.js";
import VideoCart from "./VideoCart.jsx";

const VideoContainer = () => {
  const [video,setVideo] = useState([])
  const fetchVideo = async () => {
    try {
      const res = await axios.get(`${YT_VIDEO_API}`);
      // console.log(res);
      console.log(res?.data?.items);
      setVideo(res?.data?.items)

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

        {
          video.map((item)=>{
            return(
              <VideoCart item={item}  key={item.id}/>
            )
          })
        }
       
      
      </div>
    </div>
  );
};

export default VideoContainer;
