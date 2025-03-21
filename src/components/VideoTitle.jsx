import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] w-1/4 mx-12 absolute text-white ">
      <h1 className="font-bold text-4xl">{title}</h1>
      <p className="text-lg w-1/4">{overview}</p>
      <div>
        <button className="w-20 rounded-lg bg-white hover:bg-white/20 text-black py-2 my-2 text-xl">
          ▶️ Play
        </button>
        <button className="w-20 mx-2 rounded-lg hover:bg-black/20 bg-gray-500 bg-opacity-50 text-white py-2 my-2">
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
