import React, { useState } from 'react';
import Draggable from 'react-draggable';

export default function Lyrics(props) {
    const track_id = props.track_id;
    const [lyrics, setLyrics] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleClick = async () => {
        if (track_id === "") {
            alert("No song selected");
            return;
        } 
        const fetchedLyrics = await fetchLyrics(track_id);
        setLyrics(fetchedLyrics);
        setShowPopup(true);
    };

    const getWordCount = () => {
        return lyrics.reduce((count, line) => count + line.split(' ').length, 0);
    };

    return (
        <div>
            <button onClick={handleClick}>Get Lyrics</button>
            {showPopup && (
                <Draggable>
                    <div style={{ backgroundColor: 'white', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', height: '50%', overflow: 'auto', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', zIndex: '9999' }}>
                        <button style={{ position: 'sticky', top: '0px', right: '0px', zIndex: '9999' }} onClick={() => setShowPopup(false)}>X</button>
                        <p>Word Count: {getWordCount()}</p>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {lyrics.map((line, index) => (
                                <li key={index}>{line}</li>
                            ))}
                        </ul>
                    </div>
                </Draggable>
            )}
        </div>
    );
}

async function fetchLyrics(track_id){
    const response = await fetch(`https://spot-api.ethantest.workers.dev/lyrics/${track_id}`);
    const data = await response.json();
    const lyrics = data.lyrics.lines.map(line => line.words);
    return lyrics;

}