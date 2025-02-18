import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
