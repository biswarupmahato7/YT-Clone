import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios"
import {toast, ToastContainer} from 'react-toastify'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [channelName, setChannelName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith("image")) {
  //     setProfilePic(file);
  //     setPreviewUrl(URL.createObjectURL(file));
  //   } else {
  //     alert("Please select a valid image file.");
  //   }
  // };

  const uploadImage = async (e)=>{
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0])
    data.append('upload_preset', 'YT-CLONE')
    try{
      console.log('Uploading')
      const response = await axios.post('https://api.cloudinary.com/v1_1/dctttnfjl/image/upload',data)
       console.log(response)
      const imgUrl = response.data.url
      console.log(imgUrl)
      setProfilePic(imgUrl)
      setPreviewUrl(imgUrl); 
    }catch(error){
       console.log(error)
    }

  }
  // handel sign-up

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    // Create payload object
    const payload = {
      email,
      password,
      channelName,
      profilePic, // The uploaded image URL from Cloudinary
    };
  
    try {
      const response = await axios.post("http://localhost:4000/user/signup", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        toast.success("Account created successfully!");
      } else {
        toast.error("Something went wrong. Try again!");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error(error.response?.data?.message || "Error signing up.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-6 lg:min-w-[86%] xl:min-w-[86%] w-full ">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-40 shadow-xl rounded-xl p-8 backdrop-blur-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Create Your Account</h2>

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-4">
          {previewUrl ? (
            <img src={previewUrl} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border-2 border-blue-400" />
          ) : (
            <FaUserCircle className="text-gray-400 text-6xl" />
          )}
          <label className="mt-2 text-sm text-blue-400 cursor-pointer hover:underline">
            Upload Profile Picture
            <input type="file" 
            className="hidden" accept="image/*" onChange={uploadImage} />
          </label>
        </div>

        {/* Sign-Up Form */}
        <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
          <input
            type="email"
            required
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            required
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />

          <button
            onClick={handleSignUp}
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Login Option */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <NavLink to={"/login"}>
            <span className="text-blue-400 cursor-pointer hover:underline">
              Login
            </span>
            </NavLink>
        
          </p>
        </div>
      </div>

      <ToastContainer/>
    </div>
  );
};

export default SignUp;
