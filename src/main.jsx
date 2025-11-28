if (typeof window !== "undefined" && !window.__GLOBAL_AUDIO__) {
  const audio = new Audio("/assets/Pussypodium.mp3");
  audio.loop = true;
  audio.preload = "metadata";
  audio.volume = 0.7;
  window.__GLOBAL_AUDIO__ = audio;
  window.__GLOBAL_AUDIO_IS_PLAYING__ = false;
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
