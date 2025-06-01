import { useContext } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { GameService } from "../../services/gameService";
import {
  StatCardWrapper,
  StatCardContent,
  ColorBarOrange,
  ColorBarBlue,
  StatCardStatRow,
  StatPair,
  StatCardStatName,
  StatCardStatValue,
  StatCardPlayerName,
} from "./PlayerStatsCard.style";
import playerStatCarOV from "../../assets/PlayerStats_OverlayCard.svg";

export const PlayerStatCard = () => {
  const { gameInfo } = useContext(GameInfoContext);
  const spectatedPlayer = GameService.getPlayerFromTarget(gameInfo.players, gameInfo.target);

  if (!spectatedPlayer) return null;

  const isBlueTeam = spectatedPlayer.team === 0;
  const ColorBar = isBlueTeam ? ColorBarBlue : ColorBarOrange;
  const strokeColor= spectatedPlayer.team === 0 ? "#178BFF" : "#FF5622";

  return (
    <StatCardWrapper>
      <ColorBar />
 <img
        src={playerStatCarOV}
        alt="Player Stats Background"
        style={{
          position: "absolute",
          top: -3.5,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          fontFamily: "Monofonto",
        }}
      />
      <StatCardContent>
        <StatCardPlayerName>{spectatedPlayer.name}</StatCardPlayerName>
        <StatCardStatRow>
          <StatPair>
            <StatCardStatValue $strokeColor={strokeColor}>{spectatedPlayer.goals}</StatCardStatValue>
            <StatCardStatName $strokeColor={strokeColor}>GOALS</StatCardStatName>
          </StatPair>
          <StatPair style={{ marginLeft: "5px" }}>
            <StatCardStatValue $strokeColor={strokeColor}>{spectatedPlayer.assists}</StatCardStatValue>
            <StatCardStatName $strokeColor={strokeColor}>ASSISTS</StatCardStatName>
          </StatPair>
          <StatPair style={{ marginLeft: "5px" }}>
            <StatCardStatValue $strokeColor={strokeColor}>{spectatedPlayer.saves}</StatCardStatValue>
            <StatCardStatName $strokeColor={strokeColor}>SAVES</StatCardStatName>
          </StatPair>
          <StatPair style={{ marginLeft: "5px" }}>
            <StatCardStatValue $strokeColor={strokeColor}>{spectatedPlayer.shots}</StatCardStatValue>
            <StatCardStatName $strokeColor={strokeColor}>SHOTS</StatCardStatName>
          </StatPair>
        </StatCardStatRow>
      </StatCardContent>
    </StatCardWrapper>
  );
};
