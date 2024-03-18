# SpotifAI: Spotify, but better 🎵✨
SpotifAI is a feature-rich dashboard that empowers users to interact with their music in innovative and immersive ways. Elevate your music experience with SpotifAI today!

# Key Features:
## Generate AI Playlist Cover
SpotifAI uses the DALL-E API to generate personalized playlist covers based on your playlist metadata (genres, artists, mood, etc.).

## Waveform Visualizer
View your song's audio waveform, change its speed, and download it as an MP3 file for offline enjoyment.

## Song Animator
Load an immersive and interactive Three.js 3D animation of your current song.

## Find on YouTube
Simply click a button on SpotifAI's dashboard to be redirected to your song's corresponding music video on YouTube.

## Popularity Index
See who's listening to your favorite songs and where with this interactive d3.js world map.

## Lyric Analysis
Gain insight into your current song's lyrics with this convenient pop-up.

# Team Info
- Aaron Drumm, GitHub ID: SloggyYoggy
- Richard Fang, GitHub ID: richardfang888
- Grace Feng, GitHub ID: gracefeng05
- Ethan Solomon, GitHub ID: ethansolomon49
- Kyle Uwaine, GitHub ID: kyleuwaine
- Lindsey Wen, GitHub ID: lindseywn
- Samuel Zhu, GitHub ID: smmzhu

# Tech Stack
## APIs
- Spotify API
- YouTube API
- OpenAI API
- Google Trends API
## Libraries and Frameworks
- d3.js
- Three.js
- React.js
- Wavesurfer.js
- youtube-dl ([GitHub](https://github.com/ytdl-org/youtube-dl))
- Flask
## Deployment
- Vercel
- Cloudflare
  
# User Roles
Spotify users seeking to elevate their engagement with their music.

# Roles and Permissions
**SpotifAI** is open to everyone! There is no way to put inflammatory content/hack users/etc. via our site format.
  
# [Deployment Instructions](https://github.com/ucsb-cs148-w24/project-pj10-spotifai/blob/main/docs/DEPLOY.md)

# [User Manual](https://github.com/ucsb-cs148-w24/project-pj10-spotifai/blob/main/docs/MANUAL.md)

# [Design Doc](https://github.com/ucsb-cs148-w24/project-pj10-spotifai/blob/main/docs/DESIGN.md)

# Functionality
1. Open Spotify app on your computer and play a song.
2. Login with Spotify + accept terms and conditions.
3. You will be redirected to a clone of your Spotify dashboard... but better! There are 5 main added functionalities on the **SpotifAI** dashboard: AI playlist cover generator, popularity stats, song animator, waveform visualizer, and YouTube music video player.
   - **AI Playlist Cover Generator:** Click 'Generate Playlist Cover' to get a custom image generated using a prompt based on the artists in your playlist.
   - **Song Animation:** Click 'Load Animation' to load a pop-up 3D animated icosahedron that dances to your song.
   - **Waveform Visualizer:** Click 'Load Waveform' to load a pop-up waveform song player that lets you speed up, slow down, and download an MP3 of your song.
   - **Popularity Stats:** Mouse over an interactive map to see how many people from each country are listening to your current artist.
   - **Find on YouTube:** Click 'Open Song in YouTube' to be redirected to your song's corresponding music video.
   - **Lyric Analysis:** Click 'Lyric Analysis' to view details about your song's lyrics.
  
# Known Issues
- Load Animation
   - Takes a long time to load (0-5 minutes) with songs longer than 1 minute.
   - May not load if Cloudflare Tunnel isn't running.
   - May crash Cloudflare Tunnel if user attempts to download song longer than 5 minutes.
- Load Waveform
   - Takes a long time to load (0-5 minutes) with songs longer than 1 minute.
   - May not load if Cloudflare Tunnel isn't running.
   - May crash Cloudflare Tunnel if user attempts to download song longer than 5 minutes.
- Non-premium Spotify users cannot select specific songs.
- Current song display sometimes doesn't update when new song begins playing.
- May get a 404 error if you launch SpotifAI with no song playing on your Spotify app.
- Cannot search for songs.

# Deployment
[https://project-pj10-spotifai.vercel.app/](https://project-pj10-spotifai.vercel.app/)

# Final Presentation Video Link
[https://drive.google.com/file/d/1jSt1cNjZ6dYIKPOrcK0Fg2ReGQDOMEEw/view?usp=sharing](https://drive.google.com/file/d/1jSt1cNjZ6dYIKPOrcK0Fg2ReGQDOMEEw/view?usp=sharing)

# Future Work
- User can sort playlists by danceability, energy, and valence.
- AI song generation from an image or text. See: [Google's MusicLM](https://google-research.github.io/seanet/musiclm/examples/)
- Instagram story creator.
- Download song animation.
- Add Spotify search functionality to allow users to search for songs and add to their playlists.
