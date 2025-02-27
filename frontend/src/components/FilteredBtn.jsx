import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { setCategory } from "../redux/appSlice";
const FilteredBtn = () => {

  const btns = [
    "All",
    "Live",
    "Music",
    "Vlogs",
    "Java",
    "JavaScript",
    "Ronaldo",
    "News",
    "Podcast",
    "Education",
    "Cricket",
    "Sports",
    "Tech",
    "Education",
    "Android",
    "Android",
    "Android",
    "Android",
    "Android",
    "Android",
    
  ];
  const [active, setActive] = useState("All");
  const dispatch = useDispatch()
  const videoByTag = (tag) => {
    if (active !== tag) {
      dispatch(setCategory(tag));
      setActive(tag);
    }
  }

  return (
    <div className="flex overflow-x-scroll  no-scrollbar space-x-3 p-3 ">
      {btns.map((item, index) => (
        <button
          key={index}
          onClick={()=>{videoByTag(item)}}
          className={`${active == item ? "bg-slate-900 " : "bg-slate-600 "}hidden lg:block md:block  text-gray-300 font-medium px-4 py-1 rounded-md hover:bg-gray-600 transition-all duration-200 whitespace-nowrap`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilteredBtn;
