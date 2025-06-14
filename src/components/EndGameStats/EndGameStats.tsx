import { useContext, useEffect, useState } from "react";
import { USPlayer } from "../../models/UpdateState/USPlayer";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import {
  Container,
  TeamWrapper,
  TeamColumn,
  PlayerColumn,
  StatLabelColumn,
  PlayerCell,
  StatLabel,
  PlayerName,
  PlayerNameWrapper,
  StatGroup,
} from "./EndGameStats.style";

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
          <StatLabel />
          {statLabels.map((label) => (
            <StatLabel key={label}>{label}</StatLabel>
          ))}
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
