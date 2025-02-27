import React, { useEffect, useState } from "react";
import axios from "axios";
import { YT_VIDEO_API, API_KEY } from "../config/config.js";
import VideoCart from "./VideoCart.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideo } from "../redux/appSlice.js";

const VideoContainer = () => {
 
  const {video ,category}= useSelector((store) => store.app)
  const dispatch = useDispatch()
  const fetchVideo = async () => {
    try {
      const res = await axios.get(`${YT_VIDEO_API}`);
      // console.log(res);
      console.log(res?.data?.items);
  
      dispatch(setHomeVideo(res?.data?.items))

    } catch (error) {
      console.log("Error Fetching Videos: ", error);
    }
  };
  const fetchVideoByCategory =async ()=>{
     try{
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=AIzaSyBG7LCfuSTL6lMEqEUCs3iqm7WgQfOC7PU`)
      //console.log(res.data)
      dispatch(setHomeVideo(res?.data?.items))
     }catch(error){
          console.log(error)
     }

  }

  useEffect(() => {
    if(category === 'All'){
      fetchVideo();

    }else{
      fetchVideoByCategory()
    }
    
  }, [category]);
  // console.log('video',video)

  return (
    <div className="">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  no-scrollbar">
        {video.map((item) => {
          // console.log(item.id)
          return (
            <Link to={`/watch?v=${typeof item.id === 'object' ? item.id.videoId : item.id }`} key={typeof item.id === 'object' ? item.id.videoId : video.id }>
              <VideoCart item={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VideoContainer;
