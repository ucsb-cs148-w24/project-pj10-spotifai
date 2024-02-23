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

        // Fetch currently playing track details
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

        // Print beats array and progress_ms to console
        console.log("Beats array:", beats);
        console.log("Progress in milliseconds:", progressMs);

        // Call the function to handle the animation
        handleColorChangeAnimation(beats, progressMs);
      } catch (error) {
        console.error("Error fetching audio analysis or currently playing track:", error);
      }
    };

    getCurrentTrack();
  }, [token, currentPlaying, dispatch]);

  const handleColorChangeAnimation = (beats, progressMs) => {

    // Function to generate a random color
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Find the index of the first beat after the current progress
    let currentBeatIndex = 0;
    while (
      currentBeatIndex < beats.length &&
      beats[currentBeatIndex].start * 1000 < progressMs
    ) {
      currentBeatIndex++;
    }
    console.log(currentBeatIndex);

    // If there are beats remaining after the progress, initiate the animation
    if (currentBeatIndex < beats.length) {
      const circleElement = document.querySelector(".color-changing-circle");
  
      // Create an animation timeline with anime.js
      const timeline = anime.timeline({
        easing: "linear",
        autoplay: true
      });
  
      // Iterate through beats starting from the currentBeatIndex
      for (let i = currentBeatIndex; i < beats.length; i++) {
        const beat = beats[i];
        console.log(beat.duration)
  
        // Add color change animation to the timeline
        timeline.add({
          targets: circleElement,
          backgroundColor: getRandomColor, // Change this to the desired color
          duration: beat.duration * 1000, // Convert beat duration to milliseconds
          offset: beat.start * 1000 - progressMs, // Offset the animation based on progress
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