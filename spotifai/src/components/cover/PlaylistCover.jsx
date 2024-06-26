import React, { useState } from "react";
import CoverPreview from "./CoverPreview.js";
import styles from "./styles.module.css";
import axios from "axios";
import OpenAI from "openai";
import { useStateProvider } from "../../utils/StateProvider";

export const PlaylistCoverButton = ({ onGenerateCover, isLoading }) => {
  return (
    <button
      className={styles.generateButton}
      onClick={onGenerateCover}
      disabled={isLoading}
    >
      {isLoading ? "Generating..." : "Generate Playlist Cover"}
    </button>
  );
};

const PlaylistCoverGenerator = () => {

  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [{ token, selectedPlaylist }, dispatch] = useStateProvider();

  async function generate_cover() {
    setIsLoading(true);
  
    const numTracks = selectedPlaylist.tracks.length;
    let selectedTracks = [];
  
    if (numTracks < 6 ) {
      selectedTracks = selectedPlaylist.tracks;
    } else {
      while (selectedTracks.length < 6) {
        const randomIndex = Math.floor(Math.random() * numTracks);
        const track = selectedPlaylist.tracks[randomIndex];
        if (!selectedTracks.includes(track)) {
          selectedTracks.push(track);
        }
      }
    }
  
    let artistsSet = new Set();

  
    for (let track of selectedTracks) {
      // console.log("track:", track);
      // console.log("duration:", track.duration);
      let artist = track.artists[0]; 
      artistsSet.add(artist);
    }
    
    let artistsArray = Array.from(artistsSet);
    // console.log("Collected Artists:", artistsArray.join(", "));

    let artistsString = artistsArray.join(", ");
    let prompt = `Create a basic and simple and soft art that captures the genres of these artists: ${artistsString}, with the use of only a few colors. Do not include music notes or any musical symbols and not too many details.`;
  
    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true,
    });
  
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      const image_url = response.data[0].url;
      // console.log(image_url);
      setCoverImage(image_url);
    } catch (error) {
      console.error("Error generating cover:", error);
    } finally {
      setIsLoading(false);
    }
  }
  

  const handleGenerateCover = async () => {
    setIsLoading(true);
    await generate_cover();
    setIsLoading(false);
  };

  const handleDownloadImage = () => {
    const element = document.createElement("a");
    element.setAttribute("href", coverImage);
    element.setAttribute("target", "_blank");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={styles.coverGenerator}>
      {coverImage && (
        <>
          <CoverPreview image={coverImage} />
          <button
            className={styles.downloadButton}
            onClick={handleDownloadImage}
          >
            Download
          </button>
        </>
      )}
      <PlaylistCoverButton
        onGenerateCover={handleGenerateCover}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PlaylistCoverGenerator;