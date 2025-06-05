// src/endgameStatsMain.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { EndGameStats } from "../src/components/EndGameStats/EndGameStats";
import { GameInfoProvider } from "../src/models/contexts/GameinfoProvider"; // adjust path
import "./index.css";

ReactDOM.createRoot(document.getElementById("endgame-root")!).render(
  <React.StrictMode>
    <GameInfoProvider>
      <EndGameStats />
    </GameInfoProvider>
  </React.StrictMode>
);
