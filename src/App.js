import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App() {
  const [data, setData] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [error, setError] = useState("");

  function getMeaning() {
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
      .then((response) => {
        setData(response.data[0]);
        setError("");
      })
      .catch((error) => {
        setData(null);
        setError("Word not found");
      });
  }

  function playAudio() {
    if (data && data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
      let audio = new Audio(data.phonetics[0].audio);
      audio.play();
    }
  }

  return (
    <div className="App">
      <h1>Free Dictionary</h1>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getMeaning();
          }}
        >
          <FaSearch size="20px" />
        </button>
      </div>
      {error && <p>{error}</p>}
      {data && (
        <div className="showResults">
          <h2>
            {data.word}{" "}
            <button
              onClick={() => {
                playAudio();
              }}
            >
              <FcSpeaker size="26px" />
            </button>
          </h2>
          <h4>Parts of speech:</h4>
          <p>{data.meanings[0].partOfSpeech}</p>
          <h4>Definition:</h4>
          <p>{data.meanings[0].definitions[0].definition}</p>
          <h4>Example:</h4>
          <p>
            {data.meanings[0].definitions[0].example
              ? data.meanings[0].definitions[0].example
              : "No example available"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
