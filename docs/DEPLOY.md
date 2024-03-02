**Directory Guide**
-node_modules: contains the node modules used in this project
-spotifai: contains the sourcecode and application file for the project
  - public: contains public data used for the project, such as logos and images
  - src: contains sourcecode for the project
    - components: contains different component files used in project
      - beat_visualizer: contains files related to the beat visualizer implementation
      - cover: contains files related to the AI generated covers implementation
      - lyric_analysis: contains files related to the lyric analysis implementation
    - tests: contains unit tests used in project
    - utils: contains utility files used throughout the project

**Deployment Instructions**
Since, there are limitations to being able to globally deploy the app due to SpotifyAPI restrictions, currently only local deployment is possible.
Instructions for local deployment:
1. Log into the spotify developer's dashboard and acquire your client ID to be used in the program.
2. Enter this client ID into Login.jsx
3. cd into the spotifai folder
4. In bash terminal, do "npm run build" to build the app
5. To start, type "npm start" into the terminal
