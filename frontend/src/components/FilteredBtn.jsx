import React from "react";

const FilteredBtn = () => {
  const btns = [
    "All",
    "Live",
    "Music",
    "Vlogs",
    "Java",
    "JavaScript",
    "Entertainment",
    "News",
    "Podcast",
    "Education",
    "Android",
    "News",
    "Podcast",
    "Education",
    "Android",
    
  ];

  return (
    <div className="flex scroll scrollbar-hide space-x-3 p-3 ">
      {btns.map((item, index) => (
        <button
          key={index}
          className="hidden lg:block md:block bg-gray-700 text-gray-300 font-medium px-4 py-1 rounded-md hover:bg-gray-600 transition-all duration-200 whitespace-nowrap"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilteredBtn;
