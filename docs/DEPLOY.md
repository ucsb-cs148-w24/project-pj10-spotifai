**Directory Guide**
- node_modules: contains the node modules used in this project
- spotifai: contains the sourcecode and application file for the project
  - public: contains public data used for the project, such as logos and images
  - src: contains sourcecode for the project
    - components: contains different component files used in project (Each independent file is correspondingly named by its function)
      - beat_visualizer: contains files related to the beat visualizer implementation
      - cover: contains files related to the AI generated covers implementation
      - lyric_analysis: contains files related to the lyric analysis implementation
    - tests: contains unit tests used in project
    - utils: contains utility files used throughout the project

**Deployment Instructions**
1. Acquire an OpenAI API key by registering with OpenAI and following their tutorial to generate a key. (It may be necessary to buy $5 credit for the Dall-E component to function)
2. Acquire a Spotify client ID by making a project on the Spotify Developers page.
3. Put the OpenAI API key and the Spotify client ID into the required sections (Login.jsx and PlaylistCover.jsx)
4. Secure the API key and client ID if you deem it necessary.
5. In the terminal, "cd" into the spotifai folder and run "npm run build", followed by "npm start"
6. Use SpotifAI!
