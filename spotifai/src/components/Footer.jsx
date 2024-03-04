import React from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrTrack";
// import BeatVisualizer from "./beat_visualizer/BeatVisualizer.js";
import Kaleidoscope from "./beat_visualizer/Kaleidoscope.js";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";

export default function Footer() {
  return (
    <Container>
      {/* <BeatVisualizer /> */}
      <ContentContainer>
        <CurrentTrack />
        <PlayerControls />
        <Volume />
        <Kaleidoscope />
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;