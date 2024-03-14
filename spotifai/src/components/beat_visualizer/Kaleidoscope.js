import React, { useEffect } from "react";
import axios from "axios";
import anime from "animejs";
import { useStateProvider } from "../../utils/StateProvider.jsx";
import { reducerCases } from "../../utils/Constants.js";

export default function Kaleidoscope() {
  const [{ token, currentPlaying, beats }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      if (!currentPlaying) return;

      try {
        // Fetch audio analysis
        const responseAnalysis = await axios.get(
          `https://api.spotify.com/v1/audio-analysis/${currentPlaying.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const beats = responseAnalysis.data.beats.map((beat) => ({
          start: beat.start,
          duration: beat.duration,
          confidence: beat.confidence,
        }));

        const responseCurrentlyPlaying = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const progressMs = responseCurrentlyPlaying.data.progress_ms || 0;

        dispatch({ type: reducerCases.SET_BEATS, beats });

        // console.log("Beats array:", beats);
        // console.log("Progress in milliseconds:", progressMs);

        changeColor(beats, progressMs);
      } catch (error) {
        console.error("Error fetching audio analysis or currently playing track:", error);
      }
    };

    getCurrentTrack();
  }, [token, currentPlaying, dispatch]);

  const changeColor = (beats, progressMs) => {

    // generate a random color
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // find index of first beat after current song position
    let currentBeatIndex = 0;
    while (
      currentBeatIndex < beats.length &&
      beats[currentBeatIndex].start * 1000 < progressMs
    ) {
      currentBeatIndex++;
    }
    // console.log(currentBeatIndex);

    // if there are beats remaining after current song position, initiate animation
    if (currentBeatIndex < beats.length) {
      const circleElement = document.querySelector(".color-changing-circle");
  
      // animation timeline
      const timeline = anime.timeline({
        easing: "linear",
        autoplay: true
      });
  
      // iterate through remaining beats in song
      for (let i = currentBeatIndex; i < beats.length; i++) {
        const beat = beats[i];
        // console.log(beat.duration)
  
        // populate timeline
        timeline.add({
          targets: circleElement,
          backgroundColor: getRandomColor,
          duration: beat.duration * 1000,
          offset: beat.start * 1000 - progressMs,
        });
      }
    }
  };

  return (
    <div>
      <div
        className="color-changing-circle"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "blue",
        }}
      ></div>
      {beats && (
        <div>
          <h3>Beats:</h3>
          <pre>{JSON.stringify(beats, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}