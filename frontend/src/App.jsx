import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Watch from "./components/watch";
import Body from "./components/Body";
import Feed from './components/Feed'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      }
    ]
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
