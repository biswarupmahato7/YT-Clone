import React from "react";
import Avatar from "react-avatar";

const ChatMessage = ({item}) => {
  return (
    <div className="p-2 flex gap-2 items-center">
      <div className="">
        <Avatar
          src="https://www.onthisday.com/images/people/cristiano-ronaldo.jpg?w=360"
          size={22}
          round
          className="cursor-pointer object-cover"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <h1 className="font-semibold underline text-teal-500">{item.name}</h1>
        <p className="font-thin">{item.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
