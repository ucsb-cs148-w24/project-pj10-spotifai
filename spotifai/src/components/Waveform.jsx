import React, { useEffect, useState, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { useStateProvider } from "../utils/StateProvider.jsx";

async function downloadMp3(blobURL, fileName) {
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = `${fileName}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export default function GenerateWaveform() {
    const [{ token, currentPlaying }] = useStateProvider();
    const [query, setQuery] = useState("");
    const [showPlayer, setShowPlayer] = useState(false);
    const [mp3BlobURL, setMp3BlobURL] = useState("");
    const [speed, setSpeed] = useState(1);
    const [preservePitch, setPreservePitch] = useState(false);
    const [mp3FileName, setMp3FileName] = useState("");
    const [downloading, setDownloading] = useState(false);
    const waveformRef = useRef(null);

    useEffect(() => {
        const getCurrentTrack = async () => {
            if (!currentPlaying) return;

            const newQuery = `${currentPlaying.name} ${currentPlaying.artists.join(" ")} audio`;
            setQuery(newQuery);
        };

        getCurrentTrack();
    }, [token, currentPlaying]);

    useEffect(() => {
        return () => {
            if (mp3BlobURL) {
                window.URL.revokeObjectURL(mp3BlobURL);
            }
        };
    }, [mp3BlobURL]);

    const handleDownload = async () => {
        if (query === "") {
            alert("No song selected");
            return;
        }

        setDownloading(true);

        const key = "AIzaSyC7vMbbCmg8vx1ifDx_QFqmggU4OPJ1VYA";
        const youtubeURL = await fetchYoutubeURL(query, key);
        console.log(`YouTube URL: https://www.youtube.com/watch?v=${youtubeURL}`);

        try {
            // const url = `http://0.0.0.0:4000/download?youtubeURL=${encodeURIComponent(youtubeURL)}`; // Local Host
            const url = `https://automobiles-accurately-sail-closes.trycloudflare.com/download?youtubeURL=${encodeURIComponent(youtubeURL)}`; // Cloudflare
            console.log(url);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const blobURL = window.URL.createObjectURL(blob);
                const songName = currentPlaying ? currentPlaying.name.replace(/\s+/g, '_') : 'audio';
                alert(`${songName} downloaded successfully!`);
                setMp3FileName(songName);
                setMp3BlobURL(blobURL);
                setShowPlayer(true);
            } else {
                console.error('Download failed!');
            }
        } catch (error) {
            console.error('Error sending request:', error);
        } finally {
            setDownloading(false);
        }
    };

    useEffect(() => {
        if (showPlayer && mp3BlobURL) {
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                // waveColor: 'rgb(29, 185, 84)',
                waveColor: [
                    'rgb(29, 185, 84)',
                    'rgb(136, 37, 194)'
                ],
                progressColor: 'rgb(94, 50, 120)',
                responsive: true,
                barWidth: 2,
                barGap: 1,
                barRadius: 2,
                minPxPerSec: 10,
                audioRate: speed,
            });

            wavesurfer.load(mp3BlobURL);

            wavesurfer.on('click', () => {
                wavesurfer.play()
            });

            return () => wavesurfer.destroy();
        }
    }, [showPlayer, mp3BlobURL, speed]);

    const handleSpeedChange = (event) => {
        setSpeed(parseFloat(event.target.value));
    };

    const handlePreservePitchChange = (event) => {
        setPreservePitch(event.target.checked);
    };

    return (
        <>
            <button 
                onClick={handleDownload} 
                disabled={downloading}
                style={{
                    backgroundColor: 'rgb(60, 97, 60)', 
                    color: 'white', 
                    fontSize: '16px', 
                    padding: '10px 20px', 
                    borderRadius: '20px', 
                    border: 'none', 
                    cursor: 'pointer'
                }}
            >
                {downloading ? "Downloading..." : "Download Waveform"}
            </button>
            {/* waveform popup */}
            {showPlayer && mp3BlobURL && (
                <div style={{ 
                    position: 'fixed', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    backgroundColor: 'black', 
                    padding: '40px', 
                    borderRadius: '20px', 
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', 
                    zIndex: '9999',
                    width: '80%',
                    textAlign: 'center'
                }}>
                    <h2 style={{ color: 'white', marginBottom: '20px' }}>{mp3FileName}.mp3</h2>
                    <div ref={waveformRef} style={{ width: '100%', height: '300px' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <label htmlFor="speedSlider" style={{ color: 'white', marginRight: '10px' }}>Speed:</label>
                        <input 
                            type="range" 
                            id="speedSlider" 
                            min="0.5" 
                            max="2" 
                            step="0.1" 
                            value={speed} 
                            onChange={handleSpeedChange} 
                        />
                        <span style={{ color: 'white', marginLeft: '10px' }}>{speed.toFixed(1)}</span>

                        <input 
                            type="checkbox" 
                            id="preservePitchCheckbox" 
                            checked={preservePitch} 
                            onChange={handlePreservePitchChange} 
                            style={{ marginLeft: '20px' }}
                        />
                        <label htmlFor="preservePitchCheckbox" style={{ color: 'white', marginLeft: '5px' }}>Preserve Pitch</label>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginTop: '20px' 
                    }}>
                        <button 
                            onClick={() => downloadMp3(mp3BlobURL, mp3FileName)} 
                            style={{ 
                                backgroundColor: 'rgb(60, 97, 60)', 
                                color: 'white', 
                                fontSize: '16px', 
                                padding: '10px 20px', 
                                borderRadius: '20px', 
                                border: 'none', 
                                cursor: 'pointer' 
                            }}
                        >
                            Download mp3
                        </button>
                        <button 
                            onClick={() => setShowPlayer(false)} 
                            style={{ 
                                backgroundColor: 'rgb(60, 97, 60)', 
                                color: 'white', 
                                fontSize: '16px', 
                                padding: '10px 20px', 
                                borderRadius: '20px', 
                                border: 'none', 
                                cursor: 'pointer' 
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

async function fetchYoutubeURL(query, key){
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${key}`);
    const data = await response.json();
    return data.items[0].id.videoId;
}