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
    let num_tracks = selectedPlaylist.tracks.length;
    let spotify_prompt = selectedPlaylist.tracks[0].id;

    // Add selected tracks to spotify prompt
    if (num_tracks <= 10) {
      for (let i = 1; i < num_tracks; i++) {
        spotify_prompt += "," + selectedPlaylist.tracks[i].id;
      }
    } else {
      for (let i = 1; i < 10; i++) {
        let ind = Math.floor(Math.random() * (num_tracks - 1));
        spotify_prompt += "," + selectedPlaylist.tracks[ind].id;
      }
    }

    // Get response for track features from spotify
    const spoitfy_response = await axios.get(
      `https://api.spotify.com/v1/audio-features?ids=${spotify_prompt}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    // Construct the DALL-E Prompt
    let prompt =
      "Create an abstract, visually striking playlist cover art that captures the essence of '";
    if (spoitfy_response.data.audio_features[0].danceability >= 0.5) {
      prompt += "groovy, ";
    }
    if (spoitfy_response.data.audio_features[0].energy <= 0.25) {
      prompt += "calm, ";
    } else if (spoitfy_response.data.audio_features[0].energy <= 0.5) {
      prompt += "mellow, ";
    } else if (spoitfy_response.data.audio_features[0].energy <= 0.75) {
      prompt += "upbeat, ";
    } else {
      prompt += "exciting, ";
    }
    if (spoitfy_response.data.audio_features[0].valence <= 0.25) {
      prompt += "depressing ";
    } else if (spoitfy_response.data.audio_features[0].valence <= 0.5) {
      prompt += "sad ";
    } else if (spoitfy_response.data.audio_features[0].valence <= 0.75) {
      prompt += "happy ";
    } else {
      prompt += "exhilarating ";
    }
    prompt +=
      "vibes' without using text, human figures, or traditional musical notes.";

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
      console.log(image_url);
      return image_url;
    } catch (error) {
      console.error("Error generating cover:", error);
      return null;
    }
  }

  const handleGenerateCover = async () => {
    setIsLoading(true);
    const image = await generate_cover();
    setCoverImage(image);
    setIsLoading(false);
  };

  const handleDownloadImage = () => {
    const element = document.createElement("a");
    element.setAttribute("href", coverImage);
    element.setAttribute("target", "_blank");
    //element.setAttribute("download", "playlist-cover.png");
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
