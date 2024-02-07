import logo from "./logo.svg";
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
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              backgroundColor: "yellow",
              flexGrow: 1,
            }}
          >
            {<PlaylistCoverGenerator />}
          </div>
          <div
            style={{
              backgroundColor: "green",
              flexGrow: 2.5,
            }}
          >
            {/* beat visualizer */}
            {<BeatVisualizer />}
          </div>
        </div>
        <div
          style={{
            flexGrow: 4,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              backgroundColor: "purple",
              flexGrow: 1,
            }}
          >
            {/* playlist component */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 2.5,
            }}
          >
            <div
              style={{
                flexGrow: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  backgroundColor: "blue",
                  flexGrow: 2,
                }}
              >
                {
                    token ? <Spotify /> : <Login />
                /* current song component */}
              </div>
              <div
                style={{
                  backgroundColor: "purple",
                  flexGrow: 1,
                }}
              >
                <WorldMapChart />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "pink",
                flexGrow: 1,
              }}
            >
              {/* lyric analysis component */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
