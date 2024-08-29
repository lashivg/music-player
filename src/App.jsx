import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MusicGallary from "./components/MusicGallary";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedSong, setSelectedSong] = useState(null);

  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://cms.samespace.com/items/songs");
        const data = await response.json();
        setSongs(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex flex-col w-full h-screen lg:flex-row lg:justify-between lg:overflow-hidden">
      <Navbar />
      <MusicGallary songs={songs} onSongClick={handleSongClick} />
      <MusicPlayer songs={songs} selectedSong={selectedSong} />
    </div>
  );
};

export default App;
