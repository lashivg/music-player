import React, { useState, useEffect } from "react";
import serachBtn from "../assets/search-btn.png";
import profile from "../assets/Profile.png";
import MusicPlayer from "./MusicPlayer";

const MusicGallary = ({ songs, onSongClick }) => {
  const handleSongClick = (song) => {
    onSongClick(song);
  };

  return (
    <div className="lg:w-[32%] w-full h-screen flex flex-col py-4 px-6 lg:border-l border-[#2A2A2A]">
      <div className="text-2xl flex items-center space-x-10 font-bold lg:py-4 lg:px-12 py-6 cursor-pointer">
        <h2>For You</h2>
        <h2 className=" opacity-50">Top Track</h2>
      </div>
      <div className="bg-[#2A2A2A] flex items-center justify-between px-3 py-3 rounded-lg">
        <input
          type="text"
          placeholder="Search Song, Artist"
          className="bg-[#2A2A2A] w-80 outline-none"
        />
        <div>
          <img src={serachBtn} alt="serach" />
        </div>
      </div>
      {/* Song Card Div. */}
      <div className="overflow-auto h-full py-4 scroll-container">
        <ul className="">
          {songs.map((song) => (
            <div
              key={song.id}
              className="song-card py-4 px-2 hover:bg-[#2A2A2A] rounded-xl"
              onClick={() => handleSongClick(song)}
            >
              <li className="flex items-center space-x-4">
                <div>
                  <img src={profile} alt="" />
                </div>
                <div>
                  <h2 className="text-lg">{song.name}</h2>
                  <p className="text-xs text-gray-400">{song.artist}</p>
                </div>
                <div>
                  <p>{song.duration}</p>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicGallary;
