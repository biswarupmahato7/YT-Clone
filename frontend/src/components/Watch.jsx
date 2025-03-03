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

  // State for comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      dispatch(setMessage({ name: "Biswarup", message: input }));
      setInput("");
    }
  };

  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=YOUR_API_KEY`
      );
      setSingleVideo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (videoId) getSingleVideo();
  }, [videoId]);

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { text: newComment, id: Date.now() }]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-20 text-gray-400 ml-2 flex flex-col lg:flex-row">
      {/* Video and Details Section */}
      <div className="flex-1">
        <iframe
          className="w-auto h-[220px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[550px] xl:w-[800px] rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
        <h1 className="font-bold mt-2 text-sm xl:text-lg">
          {singleVideo?.snippet?.title}
        </h1>
        {/* Comments Section */}
        <div className="mt-6 p-4 border-t">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Add a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Comment
            </button>
          </div>
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="p-2 border-b flex space-x-2">
                <Avatar size={28} round className="cursor-pointer object-cover" />
                <span className="font-semibold">User:</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
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
