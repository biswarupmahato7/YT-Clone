import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Feed/>
      </div>
    </div>
  );
};

export default App;
