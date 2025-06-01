import { useContext, useEffect } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";
import { GameInfoContext } from "../contexts/GameInfoContext";
import { UpdateState } from "../models/UpdateState/UpdateState";
import { Scorebug } from "../components/Scorebug/Scorebug";
import { PlayerBoostMeter } from "../components/PlayerBoostMeter/PlayerBoostMeter";
import { PlayerStatCard } from "../components/PlayerStatsCard/PlayerStatCard";
import { ReplayTag } from "../components/ReplayTag/Replaytag";
import { GameService } from "../services/gameService";
import { logAssisterDetection } from "../debug/logger"

export const Overlay = () => {
  const websocket = useContext(WebsocketContext);
  const { setGameInfo } = useContext(GameInfoContext);

useEffect(() => {
  websocket.subscribe("game", "update_state", (data: UpdateState) => {
    console.log("Game update received:", data); // Debug incoming data

    console.log("Winner:", data.game.winner);
    console.log("HasWinner:", data.game.hasWinner);
    console.log("Teams array:", data.game.teams);

    setGameInfo((prev) => {
  const isGameOver = data.game.hasWinner && !prev.winner;
  console.log("Replay status:", data.game.isReplay, "Previous replay status:", prev.isReplay);

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

  let lastGoal = prev.latestGoal;

if (data.game.isReplay && !prev.isReplay) {
  const scoringTeam = data.game.teams[0].score > prev.score.blue ? 0 : 1;

  const playersArray = Object.values(data.players);

  // Find which player's goals increased
  const scorerEntry = Object.entries(data.players).find(([key, current]) => {
    const prevPlayer = prev.players.find((p: any) => p.name === key);
    return current.goals > (prevPlayer?.goals ?? 0);
  });

  logAssisterDetection(data, prev);

  // Find which player's assists increased
  const assisterEntry = Object.entries(data.players).find(([key, current]) => {
    const prevPlayer = prev.players.find((p: any) => p.name === key);
    return current.assists > (prevPlayer?.assists ?? 0);
  });

  console.log

  // Use GameService getReplayPlayer to get scorer name
  const scorerName = scorerEntry
    ? GameService.getReplayPlayer(playersArray, scorerEntry[0])
    : null;

  // Use GameService getReplayPlayer to get assister name
  const assisterName = assisterEntry
    ? GameService.getReplayPlayer(playersArray, assisterEntry[0])
    : null;

  lastGoal = {
    scorer: scorerName || "Unknown",
    assister: assisterName || undefined,
    speed: data.game.ball?.speed || 0,
    team: scoringTeam,
  };

  console.log("New goal detected:", lastGoal);
  console.log("[GOAL DEBUG] No scorer detected. Current players:", data.players);
  console.log("[GOAL DEBUG] Previous players:", prev.players);
}

  

  return {
    arena: data.game.arena,
    isOT: data.game.isOT,
    isReplay: data.game.isReplay,
    target: data.game.target,
    timeRemaining: data.game.time_seconds,
    winner: data.game.winner,
    hasWinner: data.game.hasWinner,
    players: Object.values(data.players),
    score: newScore,
    seriesScore: newSeriesScore,
    currentGameNumber: newCurrentGameNumber,
    seriesLength: prev.seriesLength,
    latestGoal: lastGoal, // 👈 Include the new goal info (or unchanged if no goal)
  };
});

const onReplayStart = () => {
    console.log("[REPLAY] Replay started");
    setGameInfo(prev => ({
      ...prev,
      isReplay: true
    }));
  };

  const onReplayEnd = () => {
    console.log("[REPLAY] Replay ended");
    setGameInfo(prev => ({
      ...prev,
      isReplay: false,
      latestGoal: null,
    }));
  };
  

  websocket.subscribe("game", "replay-start", onReplayStart);
  websocket.subscribe("game", "replay-end", onReplayEnd);

  return () => {
    websocket.unsubscribe("game", "replay-start", onReplayStart);
    websocket.unsubscribe("game", "replay-end", onReplayEnd);
  };


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
