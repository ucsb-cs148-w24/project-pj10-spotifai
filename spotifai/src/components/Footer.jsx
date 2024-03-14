import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import CurrentTrack from "./CurrTrack";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
// import Kaleidoscope from "./beat_visualizer/Kaleidoscope.js";
import GenerateAudioVisualizer from "./audiovisualizer/YTmp3/GenerateAudioVisualizer";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";

export default function Footer() {
  return (
    <Container>
      <GenerateAudioVisualizer />
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