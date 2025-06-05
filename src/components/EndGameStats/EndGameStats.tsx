// src/components/EndGameStats.tsx
import { useContext } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";

export const EndGameStats = () => {
  const { gameInfo } = useContext(GameInfoContext);

  // For now, just test by listing player names
  return (
    <div>
      <h2>End Game Stats</h2>
      {gameInfo.players.map((player, index) => (
        <div key={index}>
          <p>{player.name}</p>
          {/* Add more stats here */}
        </div>
      ))}
    </div>
  );
};
