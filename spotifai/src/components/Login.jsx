import React from 'react';
import styled from "styled-components";

export default function Login() {
    const handleClick = async () => {
        const clientID = "1a10f4297b394355bfbdc500a3e6d1f8";
        const redirectUrl = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize"
        const scope = [
            "user-read-private",
            "user-read-email",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-top-read",
          ];
        window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
        )}&response_type=token&show_dialog=true`;
    };
    return <Container>
        <img src="" alt="" />
        <button onClick={handleClick}>Connect Spotify</button>
    </Container>
}

const Container = styled.div``;
