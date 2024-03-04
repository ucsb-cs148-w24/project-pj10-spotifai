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
        <StyledButton onClick={handleClick}>Connect Spotify</StyledButton>
    </Container>
}

const Container = styled.div`
    background-color: black; 
    height: 100vh; 
    width: 100vw; 
    display: flex;
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
`;

const StyledButton = styled.button`
    background-color: rgb(60, 97, 60);
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 25px;
    margin-top: 10px;
    &:hover {
        background-color: #004d00; 
    }
`;