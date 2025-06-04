import { useEffect, useState } from "react";
import { GameService } from "../../services/gameService";
import { ReplayContainer, GoalInfo } from "../ReplayTag/Replaytag.style";

export const ReplayTag = () => {
  const [goalInfo, setGoalInfo] = useState(GameService.replayTagService.getLatestGoal());

  useEffect(() => {
    // Poll every 100ms for updates
    const interval = setInterval(() => {
      const latestGoal = GameService.replayTagService.getLatestGoal();
      if (latestGoal) {
        setGoalInfo(latestGoal);
      }
      // If latestGoal is null, do NOT clear state immediately to avoid flicker
      // You might add a timer to clear after some delay if needed
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Optionally clear goalInfo when replay ends - 
  // You can listen to a replay-end event and clear here, or handle in GameService

  if (!goalInfo) return null;

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
