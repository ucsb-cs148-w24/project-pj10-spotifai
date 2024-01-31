import React from 'react';
import styles from './styles.module.css';

const PlaylistCoverButton = ({ onGenerateCover }) => {
  return (
    <button className={styles.generateButton} onClick={() => onGenerateCover()}>
      Generate Playlist Cover
    </button>
  );
};

export default PlaylistCoverButton;