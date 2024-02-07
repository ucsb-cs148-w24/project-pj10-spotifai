import WorldMapChart from "./components/DemographicMap.jsx";
import "./App.css";
import PlaylistCoverGenerator from "./components/cover/PlaylistCover.js";
import BeatVisualizer from "./components/beat_visualizer/BeatVisualizer.js";
import React, { useEffect } from "react";
import Login from "./components/Login.jsx";
import { reducerCases } from "./utils/Constants.js";
import { useStateProvider } from "./utils/StateProvider.jsx";
import Spotify from "./components/SpotifyPage.jsx";


function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [dispatch, token]);
  return <div>{token ? <Spotify /> : <Login />}</div>;
}

export default App;
