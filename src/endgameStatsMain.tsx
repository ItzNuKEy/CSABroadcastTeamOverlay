// src/endgameStatsMain.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import EndGameStatsApp from "./EndGameStatsApp";
import { GameInfoProvider } from "../src/models/contexts/GameinfoProvider"; // adjust path
import "./index.css";

ReactDOM.createRoot(document.getElementById("endgame-root")!).render(
  <React.StrictMode>
    <GameInfoProvider>
      <EndGameStatsApp />
    </GameInfoProvider>
  </React.StrictMode>
);
