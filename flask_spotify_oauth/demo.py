import spotipy
import os
from spotipy.oauth2 import SpotifyOAuth

from flask import Flask, request, url_for, session, redirect, jsonify, render_template
import time

app = Flask(__name__)

app.config['SESSION_COOKIE_NAME'] = 'Spotify Cookie'
app.secret_key = 'kittygrace101'
TOKEN_INFO = 'token_info'

class PlaylistCard:
    def __init__(self, image_url, playlist_name, playlist_id):
        self.image_url = image_url
        self.name = playlist_name
        self.playlist_id = playlist_id

    def __str__(self):
        return f"Playlist Card: {self.name} (ID: {self.playlist_id})"

@app.route('/')
def login():
    auth_url = create_spotify_oauth().get_authorize_url()
    return redirect(auth_url)

@app.route('/redirect')
def redirect_page():
    session.clear()
    code = request.args.get('code')
    token_info = create_spotify_oauth().get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect(url_for('find_playlists',_external=True))

@app.route('/find-playlists')
def find_playlists():
    try:
        token_info = get_token()
    except:
        print("User not logged in")
        return jsonify({"error": "User not logged in"})

    sp = spotipy.Spotify(auth=token_info['access_token'])
    current_playlists = sp.current_user_playlists()['items']
    user = sp.me()
    playlist_ids = dict()

    # for playlist in current_playlists:
    #     if (playlist['owner']['id'] == user['id']):
    #         playlist_ids.update({playlist['name']: playlist['id']})
    #         print(playlist['name'])

    # Prompt the user to type a playlist name
    # selected_playlist = input("Enter the name of the playlist you want to select: ")
    # selected_playlist_id = playlist_ids.get(selected_playlist)
    
    return render_template('search.html', current_playlists=current_playlists)
    # return redirect(url_for('build-prompt', external = True), data = selected_playlist_id)

    
def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        redirect(url_for('login', external = False))

    now = int(time.time())

    is_expired = token_info['expires_at'] - now < 60
    if(is_expired):
        spotify_oauth = create_spotify_oauth()
        token_info = spotify_oauth.refresh_access_token(token_info['refresh_token'])

    return token_info

def create_spotify_oauth():
    # Change scopes for our needs, see Spotify API documentation
    return SpotifyOAuth(client_id = "fbc80092a97f497a882bd35a087a480e",
                        client_secret = "d887c17a76de416996ab672576b68526",
                        redirect_uri = url_for('redirect_page', _external=True),
                        scope = 'playlist-read-private ugc-image-upload playlist-modify-public playlist-modify-private user-read-email user-read-private'
                        )

app.run(debug = True)