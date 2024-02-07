import React from 'react';
import styled from "styled-components";

export default function Login() {
    const handleClick = async () => {
        const clientID = "de12e2664c344d39a4d316e77cf7e74d";
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
