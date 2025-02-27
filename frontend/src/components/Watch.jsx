import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdShareAlt, IoMdSend } from "react-icons/io";
import { GoDownload } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import LiveChat from "./LiveChat.jsx";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/chatSlice.js";

const Watch = () => {
  const [singleVideo, setSingleVideo] = useState(null);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [input, setInput] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();

  // States for like and subscribe
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const sendMessage = () => {
    if (input.trim()) {
      dispatch(setMessage({ name: "Biswarup", message: input }));
      setInput("");
    }
  };

  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=AIzaSyBG7LCfuSTL6lMEqEUCs3iqm7WgQfOC7PU`
      );
      setSingleVideo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (videoId) getSingleVideo();
  }, [videoId]);

  return (
    <div className="mt-20  text-gray-400 ml-2 flex flex-col lg:flex-row ">
      {/* Video and Details Section */}
      <div className="flex-1 ">
        {/* Video Player */}
        <iframe
          className="w-auto h-[220px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[550px] xl:w-[800px] rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>

        {/* Video Title */}
        <h1 className="font-bold mt-2 text-sm xl:text-lg">
          {singleVideo?.snippet?.title}
        </h1>

        {/* Channel Info and Actions */}
        <div className="flex justify-between items-center mt-3 ">
          <div className="flex items-center gap-3">
            <Avatar size={35} round={true} />
            <h1 className="font-bold">{singleVideo?.snippet?.channelTitle}</h1>
            <button
              className={`px-3 py-1 rounded-full transition ${
                isSubscribed ? "bg-gray-500" : "bg-red-700"
              } text-white`}
              onClick={() => setIsSubscribed(!isSubscribed)}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <div className="flex gap-2 md:gap-3 cursor-pointer">
            <div
              className={`flex items-center py-1 px-3 rounded-3xl transition ${
                isLiked ? "bg-blue-500 text-white" : "bg-gray-900"
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <AiOutlineLike size="24px" />
              <span className="hidden sm:flex ml-1">Like</span>
            </div>
            <div className="flex items-center py-1 bg-gray-900 px-3 rounded-3xl">
              <IoMdShareAlt size="23px" />
              <span className="hidden sm:flex ml-1">Share</span>
            </div>
            <div className="flex items-center py-1 bg-gray-900 px-3 rounded-3xl">
              <GoDownload size="23px" />
              <span className="hidden sm:flex ml-1">Download</span>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="mt-4 hidden lg:block xl:block lg:w-[760px] md:w-[700px] xl:w-[760px]  p-3 bg-gray-900 rounded-lg text-sm">
          <h2 className="font-bold">Description</h2>
          <p>
            {showFullDescription
              ? singleVideo?.snippet?.description
              : singleVideo?.snippet?.description?.slice(0, 200)}
            {singleVideo?.snippet?.description?.length > 200 && (
              <button
                className="text-blue-400 ml-2"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Show less" : "Show more"}
              </button>
            )}
          </p>
        </div>

        
       
      </div>

      {/* Chat Section */}
      <div className="hidden xl:block lg:block mt-10 border border-gray-600 h-fit ml-30 w-96 p-2">
        <div className="flex justify-between items-center">
          <h1>Top Chat</h1>
          <BsThreeDotsVertical />
        </div>
        <div className="overflow-y-auto h-[28rem] flex flex-col-reverse">
          <LiveChat />
        </div>
        <div className="border-t border-gray-600 items-center p-2">
          <div className="flex gap-3">
            <Avatar size={28} round className="cursor-pointer object-cover" />
            <input
              className="outline-none border-b w-[70%] border-gray-600"
              type="text"
              placeholder="Send message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="bg-gray-600 rounded-full p-2 ml-4 cursor-pointer">
              <IoMdSend onClick={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;