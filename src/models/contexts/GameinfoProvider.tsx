import React, { useState } from "react";
import { GameInfoContext, DEFAULT_GAME_INFO } from "../../contexts/GameInfoContext";
import { GameContext } from "../contexts/GameContext";

export const GameInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameInfo, setGameInfo] = useState<GameContext>(DEFAULT_GAME_INFO);

  return (
    <GameInfoContext.Provider value={{ gameInfo, setGameInfo }}>
      {children}
    </GameInfoContext.Provider>
  );
};
