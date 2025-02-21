import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { API_KEY } from "../config/config.js";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { GoDownload } from "react-icons/go";

const Watch = () => {
  const [singleVideo, setSingleVideo] = useState("");
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  // States for like and subscribe
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );

      setSingleVideo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleVideo();
  }, []);

  return (
    <div className="mt-20 text-gray-400 ml-2">
      <div>
        {/* Video Player */}
        <iframe
          className="w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[550px] xl:w-[800px] rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        {/* Video Title */}
        <h1 className="font-bold mt-2 text-sm xl:text-lg lg:text-lg">
          {singleVideo?.snippet?.title}
        </h1>

        {/* Channel Info and Actions */}
        <div className="flex justify-between items-center mt-3">
          {/* Channel Details */}
          <div className="flex items-center gap-3">
            <Avatar
              src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
              size={35}
              round={true}
            />
            <h1 className="font-bold">{singleVideo?.snippet?.channelTitle}</h1>
            {/* Subscribe Button */}
            <button
              className={`px-3 py-1 xl:px-4 xl:py-1 font-thin xl:font-medium rounded-full transition ${
                isSubscribed ? "bg-gray-500" : "bg-red-700"
              } text-white`}
              onClick={() => setIsSubscribed(!isSubscribed)}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          {/* Like, Share, Download Buttons */}
          <div className="flex gap-2 md:gap-3 cursor-pointer">
            {/* Like Button */}
            <div
              className={`flex items-center py-1 px-3 rounded-3xl transition ${
                isLiked ? "bg-blue-600" : "bg-gray-900"
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <AiOutlineLike size="24px" />
              <span className="hidden sm:flex ml-1">Like</span>
            </div>

            {/* Share */}
            <div className="flex items-center py-1 bg-gray-900 px-3 rounded-3xl">
              <IoMdShareAlt size="23px" />
              <span className="hidden sm:flex ml-1">Share</span>
            </div>

            {/* Download */}
            <div className="flex items-center py-1 bg-gray-900 px-3 rounded-3xl">
              <GoDownload size="23px" />
              <span className="hidden sm:flex ml-1">Download</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
