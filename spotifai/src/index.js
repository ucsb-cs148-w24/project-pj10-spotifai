import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { StateContext, StateProvider } from './utils/StateProvider.jsx';
import reducer, { initialState } from './utils/reducer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);

export const useStateProvider = () => useContext(StateContext);