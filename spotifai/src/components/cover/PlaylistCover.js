import React, { useState } from "react";
import CoverPreview from "./CoverPreview.js";
import styles from "./styles.module.css";
import { generate_cover } from "../DALLE_Integration.js";

export const PlaylistCoverButton = ({ onGenerateCover }) => {
  return (
    <button className={styles.generateButton} onClick={onGenerateCover}>
      Generate Playlist Cover
    </button>
  );
};

const PlaylistCoverGenerator = () => {
  const [coverImage, setCoverImage] = useState("");
  const handleGenerateCover = async () => {
    const prompt = "happy vibes";
    const image = await generate_cover(prompt);
    setCoverImage(image);
  };

  return (
    <div className={styles.coverGenerator}>
        {coverImage && <CoverPreview image={coverImage} />}
      <PlaylistCoverButton onGenerateCover={handleGenerateCover} />
    </div>
  );
};

export default PlaylistCoverGenerator;
