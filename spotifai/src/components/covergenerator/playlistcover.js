import React, { useState } from 'react';
import PlaylistCoverButton from './playlistcoverbutton';
import CoverPreview from './coverpreview';
import styles from './styles.module.css';

const PlaylistCoverGenerator = () => {
  const [coverImage, setCoverImage] = useState('');

  const handleGenerateCover = async (songFeatures) => {
    // call the DALL-E API 
    // const image = await generateCoverWithDALLE(songFeatures);
    // setCoverImage(image);
  };

  return (
    <div className={styles.coverGenerator}>
      <PlaylistCoverButton onGenerateCover={handleGenerateCover} />
      {coverImage && <CoverPreview image={coverImage} />}
    </div>
  );
};

export default PlaylistCoverGenerator;
