import { useContext, useEffect, useState } from "react";
import { GameService } from "../../services/gameService";
import { ReplayContainer, GoalInfo } from "../ReplayTag/Replaytag.style";
import { GameInfoContext } from "../../contexts/GameInfoContext";

export const ReplayTag = () => {
  const { gameInfo } = useContext(GameInfoContext); // ✅ destructure from GameInfoContext
  const isReplay = gameInfo.isReplay;

  const [goalInfo, setGoalInfo] = useState(GameService.replayTagService.getLatestGoal());

  useEffect(() => {
    const interval = setInterval(() => {
      const latestGoal = GameService.replayTagService.getLatestGoal();
      setGoalInfo(latestGoal);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isReplay || !goalInfo) return null;

  return (
    <ReplayContainer team={goalInfo.scorer.teamnum}>
      <h2>REPLAY</h2>
      <GoalInfo>
        <p><strong>Scorer:</strong> {goalInfo.scorer.name}</p>
        {goalInfo.assister && <p><strong>Assister:</strong> {goalInfo.assister.name}</p>}
        <p><strong>Speed:</strong> {Math.round(goalInfo.goalspeed)} KPH</p>
        <p><strong>Team:</strong> {goalInfo.scorer.teamnum === 0 ? "Blue" : "Orange"}</p>
      </GoalInfo>
    </ReplayContainer>
  );
};
