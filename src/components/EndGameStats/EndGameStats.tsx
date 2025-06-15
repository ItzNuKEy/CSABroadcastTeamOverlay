import { useContext, useEffect, useState } from "react";
import { USPlayer } from "../../models/UpdateState/USPlayer";
import { GameInfoContext } from "../../contexts/GameInfoContext";

import ScoreIcon from "../../../src/assets/RLIconsSVG/stat-icons/mvp.svg";
import GoalIcon from "../../../src/assets/RLIconsSVG/stat-icons/goal.svg";
import AssistIcon from "../../../src/assets/RLIconsSVG/stat-icons/assist.svg";
import SaveIcon from "../../../src/assets/RLIconsSVG/stat-icons/save.svg";
import ShotIcon from "../../../src/assets/RLIconsSVG/stat-icons/shot-on-goal.svg";
import DemoIcon from "../../../src/assets/RLIconsSVG/stat-icons/demolition.svg";
import TouchIcon from "../../../src/assets/RLIconsSVG/stat-icons/ball-touch.svg";

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
} from "./EndGameStats.style";

// Map stat labels to imported SVGs directly (imported as React components or URL strings depending on your setup)
const statIconMap: Record<string, string> = {
  SCORE: ScoreIcon,
  GOALS: GoalIcon,
  ASSISTS: AssistIcon,
  SAVES: SaveIcon,
  SHOTS: ShotIcon,
  DEMOS: DemoIcon,
  "BALL TOUCHES": TouchIcon,
};

const LineStack = ({ count, width = "60%", height = "2px", gap = "18px" }) => {
  return (
    <LineStackWrapper style={{ gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <Underline key={i} width={width} height={height} />
      ))}
    </LineStackWrapper>
  );
};

export const EndGameStatsCard = () => {
  const { gameInfo } = useContext(GameInfoContext);
  const [players, setPlayers] = useState<USPlayer[]>([]);

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

  const statKeys = ["score", "goals", "assists", "saves", "shots", "demos", "touches"];
  const statLabels = ["SCORE", "GOALS", "ASSISTS", "SAVES", "SHOTS", "DEMOS", "BALL TOUCHES"];

  // Dynamic font size based on player name length
  const getFontSize = (name: string) => {
    if (name.length > 15) return 28;
    if (name.length > 10) return 34;
    return 42;
  };

  return (
    <Container>
      <LineStack count={7} width="1700px" height="4px" gap="97px" />
      <BlueTeamNameBacker />
      <OrangeTeamNameBacker />
      <TeamWrapper>
        {/* BLUE TEAM */}
        <TeamColumn>
          {blueTeam.map((player) => (
            <PlayerColumn key={player.name}>
              <PlayerNameWrapper>
                <PlayerName style={{ fontSize: `${getFontSize(player.name)}px` }}>
                  {player.name}
                </PlayerName>
              </PlayerNameWrapper>
              <StatGroup>
                {statKeys.map((key) => (
                  <PlayerCell key={key}>{player[key]}</PlayerCell>
                ))}
              </StatGroup>
            </PlayerColumn>
          ))}
        </TeamColumn>

        {/* STAT LABELS */}
        <StatLabelColumn>
  <div style={{ height: "28px" }} /> {/* Offset to match names */}
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

        {/* Slider bar */}
        <SliderWrapper style={{ position: "relative", zIndex: 1 }}>
          <BlueBar widthPercent={bluePercent} />
          <OrangeBar widthPercent={orangePercent} />
        </SliderWrapper>
      </div>
    );
  })}
</StatLabelColumn>

        {/* ORANGE TEAM */}
<TeamColumn>
  {orangeTeam.map((player) => (
    <PlayerColumn key={player.name}>
      <PlayerNameWrapper>
        <PlayerName style={{ fontSize: `${getFontSize(player.name)}px` }}>
          {player.name}
        </PlayerName>
      </PlayerNameWrapper>

      {/* ADD THIS: */}
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
