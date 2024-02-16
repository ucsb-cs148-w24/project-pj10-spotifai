import React, { useState } from "react";
import CoverPreview from "./CoverPreview.js";
import styles from "./styles.module.css";
import { generate_cover } from "../DALLE_Integration.js";

export const PlaylistCoverButton = ({ onGenerateCover, isLoading }) => {
  return (
    <button className={styles.generateButton} onClick={onGenerateCover} disabled={isLoading}>
      {isLoading ? "Generating..." : "Generate Playlist Cover"}
    </button>
  );
};

const PlaylistCoverGenerator = () => {
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCover = async () => {
    setIsLoading(true);
    const prompt = "Create an abstract, visually striking playlist cover art that captures the essence of 'chill vibes' without using text, human figures, or traditional musical notes.";
    const image = await generate_cover(prompt);
    setCoverImage(image);
    setIsLoading(false);
  };

  const handleDownloadImage = () => {
    const element = document.createElement("a");
    element.setAttribute("href", coverImage);
    element.setAttribute("target", "_blank"); 
    // element.setAttribute("download", "playlist-cover.png");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  return (
    <div className={styles.coverGenerator}>
      {coverImage && (
        <>
          <CoverPreview image={coverImage} />
          <button className={styles.downloadButton} onClick={handleDownloadImage}>
            Download 
          </button>
        </>
      )}
      <PlaylistCoverButton onGenerateCover={handleGenerateCover} isLoading={isLoading}/>
    </div>
  );
};

export default PlaylistCoverGenerator;
