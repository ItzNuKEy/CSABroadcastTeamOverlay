import { useContext, useEffect, useState } from "react";
import { USPlayer } from "../../models/UpdateState/USPlayer";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import {
  Container,
  TeamWrapper,
  PlayerStatColumn,
  PlayerCell,
  StatLabelColumn,
  StatRow,
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

  const statKeys = [ "score", "goals", "assists", "saves", "shots", "demos"];
  const statLabels = [ "SCORE", "GOALS", "ASSISTS", "SAVES", "SHOTS", "DEMOS"];

  return (
    <Container>
      <TeamWrapper>
        {/* Blue Team */}
        <PlayerStatColumn>
          {blueTeam.map((player) => (
            <div key={player.name}>
              <PlayerCell>{player.name}</PlayerCell>
              {statKeys.map((key) => (
                <PlayerCell key={key}>{player[key]}</PlayerCell>
              ))}
            </div>
          ))}
        </PlayerStatColumn>

        {/* Stat Labels */}
        <StatLabelColumn>
          <StatRow>STATS</StatRow>
          {statLabels.map((label) => (
            <StatRow key={label}>{label}</StatRow>
          ))}
        </StatLabelColumn>

        {/* Orange Team */}
        <PlayerStatColumn>
          {orangeTeam.map((player) => (
            <div key={player.name}>
              <PlayerCell>{player.name}</PlayerCell>
              {statKeys.map((key) => (
                <PlayerCell key={key}>{player[key]}</PlayerCell>
              ))}
            </div>
          ))}
        </PlayerStatColumn>
      </TeamWrapper>
    </Container>
  );
};
