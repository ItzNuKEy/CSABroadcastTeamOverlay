import { useContext, useEffect } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";
import { GameInfoContext } from "../contexts/GameInfoContext";
import { UpdateState } from "../models/UpdateState/UpdateState";
import { Scorebug } from "../components/Scorebug/Scorebug";
import { PlayerBoostMeter } from "../components/PlayerBoostMeter/PlayerBoostMeter";
import { PlayerStatCard } from "../components/PlayerStatsCard/PlayerStatCard";
import { ReplayTag } from "../components/ReplayTag/Replaytag";

export const Overlay = () => {
  const websocket = useContext(WebsocketContext);
  const { setGameInfo } = useContext(GameInfoContext);

useEffect(() => {
  websocket.subscribe("game", "update_state", (data: UpdateState) => {
    console.log("Game update received:", data); // Debug incoming data

    setGameInfo((prev) => {
      const isGameOver = data.game.hasWinner && !prev.winner;

      let newSeriesScore = { ...prev.seriesScore };
      let newCurrentGameNumber = prev.currentGameNumber;

      if (isGameOver) {
        const blueName = data.game.teams[0].name;
        const orangeName = data.game.teams[1].name;

        if (data.game.winner === blueName) {
          newSeriesScore.blue += 1;
        } else if (data.game.winner === orangeName) {
          newSeriesScore.orange += 1;
        }

        newCurrentGameNumber += 1;
      }

      const newScore = {
        blue: data.game.teams[0].score,
        orange: data.game.teams[1].score,
      };

      return {
        arena: data.game.arena,
        isOT: data.game.isOT,
        isReplay: data.game.isReplay,  // you can keep this if you want
        target: data.game.target,
        timeRemaining: data.game.time_seconds,
        winner: data.game.winner,
        hasWinner: data.game.hasWinner,
        players: Object.values(data.players),
        score: newScore,
        seriesScore: newSeriesScore,
        currentGameNumber: newCurrentGameNumber,
        seriesLength: prev.seriesLength,
        // Remove latestGoal here, it's handled by GameService now
      };
    });
  });

}, [websocket, setGameInfo]);


  return (
    <>
      <Scorebug />
      <PlayerBoostMeter />
      <PlayerStatCard />
      <ReplayTag />
    </>
  );
};
