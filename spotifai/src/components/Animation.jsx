import React, { useEffect, useState, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { useStateProvider } from "../utils/StateProvider.jsx";

export default function GenerateAudioVisualizer() {
    const [{ token, currentPlaying }] = useStateProvider();
    const [query, setQuery] = useState("");
    const [showPlayer, setShowPlayer] = useState(false);
    const [mp3BlobURL, setMp3BlobURL] = useState("");
    const [loading, setLoading] = useState(false); // add loading state
    const containerRef = useRef(null);
    const camera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    const renderer = useRef(new THREE.WebGLRenderer());
    const icosahedron = useRef(null);
    const audioRef = useRef(null);
    const audioContext = useRef(null);
    const analyser = useRef(null);
    const dataArray = useRef(null);

    const handleResize = () => {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
    };

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

        setLoading(true); // set loading state to true

        const key = "AIzaSyC7vMbbCmg8vx1ifDx_QFqmggU4OPJ1VYA";
        const youtubeURL = await fetchYoutubeURL(query, key);

        try {
            // const url = `https://thunder-bookmarks-showcase-wheat.trycloudflare.com/download?youtubeURL=${encodeURIComponent(youtubeURL)}`; // Cloudflare
            // const url = `http://0.0.0.0:4000/download?youtubeURL=9V6u2svCm6E`
            const url = `http://128.111.30.218:6438/download?youtubeURL=${encodeURIComponent(youtubeURL)}`; // CSIL

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const blobURL = window.URL.createObjectURL(blob);
                setShowPlayer(true);
                setMp3BlobURL(blobURL);
                setLoading(false); // set loading state to false after mp3 is loaded
            } else {
                console.error('Download failed!');
            }
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    useEffect(() => {
        if (showPlayer && mp3BlobURL) {
            const scene = new THREE.Scene();
            scene.background = null;
    
            const currentRenderer = renderer.current;
            currentRenderer.setSize(window.innerWidth, window.innerHeight);
            currentRenderer.setClearColor(0x000000, 0);

            const composer = new EffectComposer(currentRenderer);
            const renderPass = new RenderPass(scene, camera.current);
            composer.addPass(renderPass);
            const bloomPass = new UnrealBloomPass();
            bloomPass.strength = 1.5;
            bloomPass.radius = 0.2;
            bloomPass.threshold = 0.4;
            composer.addPass(bloomPass);
    
            const container = containerRef.current;
            if (container) {
                currentRenderer.setSize(container.offsetWidth, container.offsetHeight);
                container.appendChild(currentRenderer.domElement);
    
                const aspect = container.offsetWidth / container.offsetHeight;
                camera.current.aspect = aspect;
                camera.current.position.z = 5;
            }
    
            const geometry = new THREE.IcosahedronGeometry(1, 3);
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
            icosahedron.current = new THREE.Mesh(geometry, material);
            scene.add(icosahedron.current);
    
            icosahedron.current.position.set(0, 0, 0);
    
            const controls = new OrbitControls(camera.current, currentRenderer.domElement);
            controls.update();
    
            audioContext.current = new AudioContext();
            analyser.current = audioContext.current.createAnalyser();
            analyser.current.fftSize = 256;
            dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);
    
            // load audio
            audioRef.current = new Audio(mp3BlobURL);
            audioRef.current.crossOrigin = 'anonymous';
            const audioSrc = audioContext.current.createMediaElementSource(audioRef.current);
            audioSrc.connect(analyser.current);
            audioSrc.connect(audioContext.current.destination);
    
            // play audio
            audioRef.current.play();
    
            // animation loop
            const animate = () => {
                requestAnimationFrame(animate);

                // update icosahedron position based on audio data
                if (icosahedron.current) {
                    analyser.current.getByteFrequencyData(dataArray.current);
                    const average = dataArray.current.reduce((acc, val) => acc + val, 0) / dataArray.current.length;
                    icosahedron.current.scale.set(2 + average / 10, 2 + average / 20, 2 + average / 10);
                    
                    icosahedron.current.rotation.x += 0.01;
                    icosahedron.current.rotation.y += 0.02;

                    const hue = (Date.now() % 10000) / 10000;
                    const color = new THREE.Color().setHSL(hue, 1, 0.5);
                    icosahedron.current.material.color = color;

                    bloomPass.strength = 1.5 + average / 50;
                    bloomPass.radius = 0.2 + average / 200;
                }

                composer.render();
            };
            animate();
    
            window.addEventListener('resize', handleResize);
    
            return () => {
                // cleanup
                window.removeEventListener('resize', handleResize);
                if (container) {
                    container.removeChild(currentRenderer.domElement);
                }
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current = null;
                }
                if (audioContext.current) {
                    audioContext.current.close();
                    audioContext.current = null;
                }
            };
        }
    }, [showPlayer, mp3BlobURL]);

    return (
        <>
            <button 
                onClick={handleDownload} 
                style={{
                    backgroundColor: 'rgb(60, 97, 60)', 
                    color: 'white', 
                    fontSize: '16px', 
                    padding: '10px 20px', 
                    borderRadius: '20px', 
                    border: 'none', 
                    cursor: 'pointer'
                }}
                disabled={loading} // disable button while loading
            >
                {loading ? 'Loading...' : 'Load Animation'} {/* change button text to 'Loading...' when loading */}
            </button>
            {/* waveform popup */}
            {showPlayer && mp3BlobURL && (
                <div style={{ 
                    position: 'fixed', 
                    bottom: '20px', // change position to bottom right corner
                    right: '20px', // change position to bottom right corner
                    backgroundColor: 'black', 
                    padding: '40px', 
                    borderRadius: '20px', 
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', 
                    zIndex: '9999',
                    width: '80%',
                    height: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
                    <button 
                        onClick={() => setShowPlayer(false)} 
                        style={{ 
                            backgroundColor: 'rgb(60, 97, 60)', 
                            color: 'white', 
                            fontSize: '16px', 
                            padding: '10px 20px', 
                            borderRadius: '20px', 
                            border: 'none', 
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                        }}
                    >
                        Close
                    </button>
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
