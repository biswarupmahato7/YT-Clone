import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { userId } = useParams(); // Get user ID from URL params
  console.log("User ID:", userId);
  const [userData, setUserData] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch user's uploaded videos
    const fetchUserVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/videos/user/${userId}`);
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchUserProfile();
    fetchUserVideos();
  }, [userId]);

  if (!userData) return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6"
      style={{ marginLeft: "260px", paddingTop: "70px" }} // Adjusted for sidebar & navbar
    >
      {/* User Info Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          {userData.profilePic ? (
            <img
              src={userData.profilePic}
              alt="User Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-20 h-20 text-gray-400" />
          )}

          {/* User Details */}
          <div>
            <h2 className="text-2xl font-bold">{userData.channelName}</h2>
            <p className="text-gray-400">{userData.subscribers} Subscribers</p>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="mt-8 max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Uploaded Videos</h3>
        {videos.length === 0 ? (
          <p className="text-gray-400">No videos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h4 className="mt-2 text-lg font-medium">{video.title}</h4>
                <p className="text-sm text-gray-400">{video.views} views</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
