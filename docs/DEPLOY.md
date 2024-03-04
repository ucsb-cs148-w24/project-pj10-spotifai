**Directory Guide**
- node_modules: contains the node modules used in this project
- spotifai: contains the sourcecode and application file for the project
  - public: contains public data used for the project, such as logos and images
  - src: contains sourcecode for the project
    - components: contains different component files used in project
      - beat_visualizer: contains files related to the beat visualizer implementation
      - cover: contains files related to the AI generated covers implementation
      - lyric_analysis: contains files related to the lyric analysis implementation
    - tests: contains unit tests used in project
    - utils: contains utility files used throughout the project

**Deployment Instructions**
- Since, there are limitations to being able to globally deploy the app due to SpotifyAPI restrictions, currently each member needs to be email verified by our team using a whitelist.
- There are also other limitations such as song playing being limited to Spotify Premium members.

1. The user should send our team the email that is linked with their spotify account
2. Open Spotify either on your desktop or your phone (Play a song for a second to notify the API that your aren't afk)
4. Go to the release link (project-pj10-spotifai.vercel.app) and log in with your email
