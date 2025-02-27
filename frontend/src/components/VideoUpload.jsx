import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video")) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("video")) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Invalid file type. Please upload a video.");
    }
  };

  const handleVideoUpload = (e) => {
    e.preventDefault();
    if(!videoFile || !title || !description || !category){
      alert('Please Provide all details')
    }
    console.log("Signing up with:", { videoFile, previewUrl, title, description,category });
  };

  return (
    <div className="flex items-center min-w-[87%] justify-center min-h-fit bg-gray-900 text-white px-6">
      <div className="w-full max-w-3xl bg-gray-800 bg-opacity-50 shadow-2xl rounded-xl p-8 backdrop-blur-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Upload Your Video</h2>
        
        {/* Video Title */}
        <input
          required
          type="text"
          placeholder="Video Title"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Video Description */}
        <textarea
          required
          placeholder="Video Description"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Video Category */}
        <select
          required
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Technology">Technology</option>
          <option value="Gaming">Gaming</option>
          <option value="Vlogs">Vlogs</option>
        </select>

        {/* Upload Box */}
        <div
          className="border-2 border-dashed border-gray-500 rounded-xl p-10 text-center cursor-pointer hover:border-blue-400 transition-all duration-300 ease-in-out"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <label className="cursor-pointer flex flex-col items-center">
            <FaCloudUploadAlt size={60} className="text-gray-400 mb-3 hover:text-blue-400 transition-all duration-300" />
            <p className="text-gray-400">Drag & Drop or Click to Upload</p>
            <input type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
          </label>
        </div>

        {/* Video Preview */}
        {previewUrl && (
          <div className="mt-6 w-full">
            <h3 className="text-lg text-gray-300 mb-3 text-center">Video Preview</h3>
            <video src={previewUrl} controls className="w-full max-h-64 rounded-lg shadow-lg border border-gray-600"></video>
          </div>
        )}

        {/* Upload Button */}
        <button onClick={handleVideoUpload } className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
          Upload Video
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
