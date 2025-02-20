import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";

import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    
  }
])

const App = () => {
  return (
    <div className="">
      <Navbar />
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
