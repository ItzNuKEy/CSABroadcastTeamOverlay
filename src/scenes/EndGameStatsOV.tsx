import { useContext, useEffect } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";
import { GameInfoContext } from "../contexts/GameInfoContext";
import { UpdateState } from "../models/UpdateState/UpdateState";
import { EndGameStatsCard } from "../components/EndGameStats/EndGameStats";
import { EndGameScore } from "../components/EndGameScore/EndGameScore";

export const EndGameStatsOV = () => {
  const websocket = useContext(WebsocketContext);
  const { setGameInfo } = useContext(GameInfoContext);

  useEffect(() => {
    const unsubscribe = websocket.subscribe("game", "update_state", (data: UpdateState) => {
      console.log("Game update received:", data);

      const allPlayers = Object.values(data.players);

      // Only find MVP after game ends
      let mvpPlayerName = null;
      let winningTeamNum = null;

      if (data.game.hasWinner) {
        winningTeamNum = data.game.teams.findIndex(team => team.name === data.game.winner);

        if (winningTeamNum !== -1) {
          const winningTeamPlayers = allPlayers.filter(p => p.team === winningTeamNum);

          if (winningTeamPlayers.length > 0) {
            const topPlayer = winningTeamPlayers.reduce((top, curr) =>
              (curr.score || 0) > (top.score || 0) ? curr : top
            );
            mvpPlayerName = topPlayer.name;
          }
        }
      }

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
          isReplay: data.game.isReplay,
          target: data.game.target,
          timeRemaining: data.game.time_seconds,
          winner: data.game.winner,
          hasWinner: data.game.hasWinner,
          players: allPlayers,
          score: newScore,
          seriesScore: newSeriesScore,
          currentGameNumber: newCurrentGameNumber,
          seriesLength: prev.seriesLength,
          mvpPlayer: mvpPlayerName,     // <-- MVP player name here
          winningTeamNum: winningTeamNum, // <-- Winning team number here
        };
      });
    });

    return () => {
      unsubscribe?.();
    };
  }, [websocket, setGameInfo]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <EndGameScore />
      <EndGameStatsCard />
    </div>
  );
};
