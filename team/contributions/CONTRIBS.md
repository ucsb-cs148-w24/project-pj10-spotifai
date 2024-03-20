### Aaron Drumm
- Worked on making the Spotify API connection allowing users to log in and get access to their data along with making more aesthetic UI
- Figured out connection between users and spotify api allowing certain emails to log in
### Richard Fang
- Worked on making the Spotify API connection allowing users to log in and get access to their data along with making more aesthetic UI
- Deployed the project on Vercel allowing anyone to access the page 
### Grace Feng
- **Download YouTube as MP3**
  - Spotify API, YouTube API, Flask, [youtube-dl](https://github.com/silvanohirtie/youtube-mp3-downloader), Cloudflare
  - Used Spotify API and YouTube API to get YouTube URL of currently playing song --> Passed URL to Cloudflare Tunnel on https server --> Cloudflare Tunnel redirects to Flask server on localhost http server --> Flask server downloads URL as MP3 and returns MP3.
- **Waveform Visualizer**
  - Wavesurfer.js
  - Load MP3 from previous functionality --> Display song waveform in pop-up & allow user to modify tempo.
  - Pop-up enables user to download MP3 to their device.
- **Song Animation**
  - Three.js
  - Load MP3 from previous functionality --> Generate 3D icosahedron that listens to MP3 and moves to audio features (frequency, amplitude).
### Lindsey Wen
- Worked on playlist cover generation such that users can generate and download the generated image
- Experimented with prompting DALLE to improve the accuracy of the generated playlist covers
### Samuel Zhu
- Created d3 component and data input, also integrated pytrends into custom flask server to bypass CORS
- Created open in youtube link button with youtube API integration
### Kyle Uwaine
- Integrated Spotify API and OpenAI API to implement the AI playlist cover generation
- Worked on prompt engineering to improve the cover generation
### Ethan Solomon
- Deployed Lyrics API on Cloudflare, and created lyrics popup component to display lyrics, word count, word density  
- Helped planning UI / wireframe  
