/* 
Sure, Trae! It's a great idea to store the filtered songs in a state to keep your component's logic organized. Here's how you can refactor the code to achieve that: 
*/
import React, { useState, useEffect } from "react";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("ALL");
  const [renderingMode, setRenderingMode] = useState("ALL");
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    // Fetch songs using Fetch API
    fetch("/api/songs") // You'll need to create an API route for this
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  useEffect(() => {
    // Apply filters based on search term and selected genre
    let updatedSongs = songs;

    if (renderingMode === "INPUT") {
      updatedSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (renderingMode === "SELECT") {
      updatedSongs =
        selectedGenre === "ALL"
          ? songs
          : songs.filter((song) => song.genre === selectedGenre);
    }

    setFilteredSongs(updatedSongs);
  }, [songs, renderingMode, searchTerm, selectedGenre]);

  useEffect(() => {
    if (searchTerm === "") {
      setRenderingMode("ALL");
    }
  }, [searchTerm]);

  const genreOptions = ["ALL", "Rap", "Soul", "Rock", "Country"];

  return (
    <div>
      <input
        type="search"
        placeholder="Search by song name"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setRenderingMode("INPUT");
        }}
      />

      <select
        value={selectedGenre}
        onChange={(e) => {
          setSelectedGenre(e.target.value);
          setRenderingMode("SELECT");
        }}
      >
        {genreOptions.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {filteredSongs.map((song) => (
        <div key={song.id}>
          <img src={song.albumArt} alt="Album Art" />
          <p>{song.title}</p>
          <p>{song.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default SongList;

/* 
In this refactored version, I've added a filteredSongs state to hold the filtered songs based on user interactions. The useEffect hook is used to update the filteredSongs state whenever there's a change in songs, renderingMode, searchTerm, or selectedGenre. This ensures that the filtered songs are always up-to-date based on the current state of the component.
*/
