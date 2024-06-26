import React from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrTrack";
import GenerateWaveform from "./Waveform";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
import YoutubeLinkButton from "./YoutubeLinkButton.jsx";
import GenerateAnimation from "./Animation";

export default function Footer() {
  return (
    <Container>
      <GenerateWaveform />
      <GenerateAnimation />
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </Container>
  );
}

const Container = styled.div`
  height: auto; /* Adjust the height as needed */
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: flex;
  justify-content: space-around;
  align-items: center; /* Align items vertically */
  overflow: hidden; /* Ensure child elements do not overflow */
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

const KaleidoscopeWrapper = styled.div`
  padding-right: 3rem;
`;