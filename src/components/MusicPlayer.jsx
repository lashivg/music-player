import React, { useState, useEffect, useRef } from "react";
import profile from "../assets/Profile.png";

const MusicPlayer = ({ selectedSong, songs, onSongChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (selectedSong && audioRef.current) {
      audioRef.current.src = selectedSong.url;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  }, [selectedSong]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const updateDuration = () => {
      setDuration(audioRef.current.duration);
    };

    const audio = audioRef.current;
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    onSongChange(nextSong);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    const previousSong = songs[previousIndex];
    onSongChange(previousSong);
    setIsPlaying(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <audio ref={audioRef} />
      <div
        className={`lg:w-[50%] w-full lg:h-screen h-[15%] lg:bg-none lg:relative fixed ${
          selectedSong ? "max-sm:bg-[#2a2a2a] max-md:bg-[#2a2a2a]" : ""
        } bottom-0 left-0 flex items-evenly`}
      >
        {selectedSong && (
          <div
            key={selectedSong.id}
            className="flex items-center justify-between w-full px-20 py-16 -translate-x-10 lg:flex-col"
          >
            <div>
              <h1 className="text-sm lg:text-4xl">{selectedSong.name}</h1>
              <p className="text-xs text-gray-400 lg:text-xl">
                {selectedSong.artist}
              </p>
            </div>
            {/* <div className="border lg:w-[80%] lg:h-[400px] w-10 h-10 md:left-0 p-4 mt-6">
              <img src={selectedSong.coverImage} alt="songCoverImg" />
            </div> */}
            <div className="flex items-center justify-center w-full lg:h-[400px]">
              <div className="w-full p-2 sm:w-3/4 md:w-[20%] lg:w-1/3 xl:w-1/4 flex items-center justify-center">
                <img
                  src={profile}
                  alt="Responsive"
                  className="object-cover w-auto h-full"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center mt-4 space-x-4">
                <button onClick={handlePrevious} className="text-xs lg:text-xl">
                  Previous
                </button>
                <button
                  onClick={handlePlayPause}
                  className="text-xs lg:text-xl"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button onClick={handleNext} className="text-xs lg:text-xl">
                  Next
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  value={(currentTime / duration) * 100}
                  onChange={handleSeek}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
