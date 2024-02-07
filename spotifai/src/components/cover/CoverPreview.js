import React from 'react';
import styles from './styles.module.css';

const CoverPreview = ({ image }) => {
  return (
    <div className={styles.coverPreview}>
      <img src={image} alt="Generated Playlist Cover" />
    </div>
  );
};

export default CoverPreview;
