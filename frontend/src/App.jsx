import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Watch from "./components/watch";
import Body from "./components/Body";
import Feed from './components/Feed'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoUpload from "./components/VideoUpload";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import axios from "axios";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children :[
      {
        path: '/',
        element: <Feed/>

      },
      {
        path: '/watch',
        element: <Watch/>
      },
      {
        path: '/upload',
        element: <VideoUpload/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/sign-up',
        element: <SignUp/>
      }
    ]
  }
])

const App = () => {
  return (
    <div className="no-scrollbar">
      {/* <Navbar /> */}
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
