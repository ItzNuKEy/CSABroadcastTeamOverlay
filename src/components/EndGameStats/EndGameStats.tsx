import { useContext, useEffect, useState } from "react";
import { USPlayer } from "../../models/UpdateState/USPlayer";
import { GameInfoContext } from "../../contexts/GameInfoContext";

import SCOREIcon from "../../../src/assets/RLIconsSVG/stat-icons/mvp.svg";
import GoalIcon from "../../../src/assets/RLIconsSVG/stat-icons/goal.svg";
import AssistIcon from "../../../src/assets/RLIconsSVG/stat-icons/assist.svg";
import SaveIcon from "../../../src/assets/RLIconsSVG/stat-icons/save.svg";
import ShotIcon from "../../../src/assets/RLIconsSVG/stat-icons/shot-on-goal.svg";
import DemoIcon from "../../../src/assets/RLIconsSVG/stat-icons/demolition.svg";
import TouchIcon from "../../../src/assets/RLIconsSVG/stat-icons/ball-touch.svg";
import MVPIcon from "../../assets/RLIconsSVG/stat-icons/mvp.svg";

import {
  Container,
  TeamWrapper,
  TeamColumn,
  PlayerColumn,
  StatLabelColumn,
  PlayerCell,
  PlayerName,
  PlayerNameWrapper,
  StatGroup,
  StatLabelRow,
  StatLabel,
  StatIcon,
  LineStackWrapper,
  Underline,
  BlueBar,
  OrangeBar,
  SliderWrapper,
  BlueTeamNameBacker,
  OrangeTeamNameBacker,
  MVPBadge, // <-- Make sure this is styled in your styles file
} from "./EndGameStats.style";

const statIconMap: Record<string, string> = {
  SCORE: SCOREIcon,
  GOALS: GoalIcon,
  ASSISTS: AssistIcon,
  SAVES: SaveIcon,
  SHOTS: ShotIcon,
  DEMOS: DemoIcon,
  "BALL TOUCHES": TouchIcon,
};

const LineStack = ({ count, width = "60%", height = "2px", gap = "18px" }) => (
  <LineStackWrapper style={{ gap }}>
    {Array.from({ length: count }).map((_, i) => (
      <Underline key={i} width={width} height={height} />
    ))}
  </LineStackWrapper>
);

export const EndGameStatsCard = () => {
  const { gameInfo } = useContext(GameInfoContext);
  const [players, setPlayers] = useState<USPlayer[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameInfo?.players) {
        setPlayers(gameInfo.players);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [gameInfo]);

  const blueTeam = players.filter((p) => p.team === 0);
  const orangeTeam = players.filter((p) => p.team === 1);

  const allPlayers = [...blueTeam, ...orangeTeam];
const mvpPlayer = allPlayers.length
  ? allPlayers.reduce(
      (top, curr) => (curr.score || 0) > (top.score || 0) ? curr : top,
      allPlayers[0]
    )
  : null;

  const statKeys = ["score", "goals", "assists", "saves", "shots", "demos", "touches"];
  const statLabels = ["SCORE", "GOALS", "ASSISTS", "SAVES", "SHOTS", "DEMOS", "BALL TOUCHES"];

  const getFontSize = (name: string) => {
    if (name.length > 15) return 28;
    if (name.length > 10) return 34;
    return 42;
  };

  const getTeamStatTotals = (statKey: string) => {
    const blueTotal = blueTeam.reduce((acc, player) => acc + (player[statKey] || 0), 0);
    const orangeTotal = orangeTeam.reduce((acc, player) => acc + (player[statKey] || 0), 0);
    return { blueTotal, orangeTotal };
  };

  const getPercentages = (blue: number, orange: number) => {
    const total = blue + orange;
    if (total === 0) return { bluePercent: 50, orangePercent: 50 };
    return {
      bluePercent: (blue / total) * 100,
      orangePercent: (orange / total) * 100,
    };
  };

  return (
    <Container>
      <LineStack count={7} width="1700px" height="4px" gap="97px" />
      <BlueTeamNameBacker />
      <OrangeTeamNameBacker />
      <TeamWrapper>
        {/* Blue Team */}
        <TeamColumn>
          {blueTeam.map((player) => (
            <PlayerColumn key={player.name}>
              <PlayerNameWrapper>
  <MVPBadge team="blue">
  {gameInfo.winner &&
   gameInfo.winningTeamNum === 0 &&
   gameInfo.mvpPlayer?.name === player.name && (
    <img src={MVPIcon} alt="MVP" title="MVP" width={42} height={42} />
  )}
  <PlayerName style={{ fontSize: `${getFontSize(player.name)}px` }}>
    {player.name}
  </PlayerName>
</MVPBadge>
</PlayerNameWrapper>
              <StatGroup>
                {statKeys.map((key) => (
                  <PlayerCell key={key}>{player[key]}</PlayerCell>
                ))}
              </StatGroup>
            </PlayerColumn>
          ))}
        </TeamColumn>

        {/* Stat Labels */}
        <StatLabelColumn style={{zIndex: 2}}>
          <div style={{ height: "28px" }} />
          {statLabels.map((label, index) => {
            const statKey = statKeys[index];
            const { blueTotal, orangeTotal } = getTeamStatTotals(statKey);
            const { bluePercent, orangePercent } = getPercentages(blueTotal, orangeTotal);

            return (
              <div key={label} style={{ marginBottom: "20px" }}>
                <StatLabelRow>
                  <StatIcon src={statIconMap[label]} alt={label} />
                  <StatLabel>{label}</StatLabel>
                </StatLabelRow>
                <SliderWrapper>
                  <BlueBar widthPercent={bluePercent} />
                  <OrangeBar widthPercent={orangePercent} />
                </SliderWrapper>
              </div>
            );
          })}
        </StatLabelColumn>

        {/* Orange Team */}
        <TeamColumn>
          {orangeTeam.map((player) => (
            <PlayerColumn key={player.name}>
              <PlayerNameWrapper>
  <MVPBadge team="orange">
  {gameInfo.winner &&
   gameInfo.winningTeamNum === 1 &&
   gameInfo.mvpPlayer?.name === player.name && (
    <img src={MVPIcon} alt="MVP" title="MVP" width={42} height={42} />
  )}
  <PlayerName style={{ fontSize: `${getFontSize(player.name)}px` }}>
    {player.name}
  </PlayerName>
</MVPBadge>
</PlayerNameWrapper>
              <StatGroup>
                {statKeys.map((key) => (
                  <PlayerCell key={key}>{player[key]}</PlayerCell>
                ))}
              </StatGroup>
            </PlayerColumn>
          ))}
        </TeamColumn>
      </TeamWrapper>
    </Container>
  );
};
