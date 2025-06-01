import { useContext } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { GoalInfo, ReplayContainer, ReplayText } from "./Replaytag.style";

export const ReplayTag = () => {
  const { gameInfo } = useContext(GameInfoContext);
  const { isReplay, latestGoal } = gameInfo;

  if (!isReplay || !latestGoal) return null;

  const { scorer, assister, speed, team } = latestGoal;

  

  return (
    <ReplayContainer team={team ?? 0}>
      <ReplayText>REPLAY</ReplayText>
      <GoalInfo>
        <p><strong>Scorer:</strong> {scorer}</p>
        {assister && <p><strong>Assister:</strong> {assister || null}</p>}
        <p><strong>Ball Speed:</strong> {Math.round(speed ?? 0)} kph</p>
      </GoalInfo>
    </ReplayContainer>
  );
};

export default ReplayTag;
