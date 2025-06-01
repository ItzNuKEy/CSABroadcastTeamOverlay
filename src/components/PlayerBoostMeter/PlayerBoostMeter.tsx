import { useContext } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { GameService } from "../../services/gameService";
import {
  BoostMeterInnerCircle,
  BoostMeterRing,
  BoostMeterText,
  BoostMeterWrapper
} from "./PlayerBoostMeter.style";
import  boostBottom  from "../../assets/Meter_Bottom.svg";
import  boostTop  from "../../assets/Meter_Top.svg";

export const PlayerBoostMeter = () => {
  const { gameInfo } = useContext(GameInfoContext);
  const spectatedPlayer = GameService.getPlayerFromTarget(gameInfo.players, gameInfo.target);

  const SVG_SIZE = 275;
  const STROKE_WIDTH = 22;

  const radius = SVG_SIZE / 2 - STROKE_WIDTH / 2 - 3;
  const fullCircumference = 2 * Math.PI * radius;
  const maxArcPercent = 0.82; // 82% of circle
  const maxArcLength = fullCircumference * maxArcPercent;

  const boostPercent = spectatedPlayer?.boost ?? 0;
  const dashOffset = maxArcLength * ((100 - boostPercent) / 100);

  return (
    <BoostMeterWrapper>
      {spectatedPlayer && (
        <svg height={SVG_SIZE} width={SVG_SIZE}>
            <image 
            href={boostBottom}
            width={SVG_SIZE}
            height={SVG_SIZE}
            />
          <BoostMeterRing
            $color={spectatedPlayer.team === 0 ? "#178BFF" : "#FF5622"}
            $dashoffset={dashOffset}
            $arcLength={maxArcLength}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            r={radius}
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2}
            transform={`rotate(90 ${SVG_SIZE / 2} ${SVG_SIZE / 2})`}
            opacity={spectatedPlayer.boost === 0 ? 0 : 1}
          />
          <BoostMeterInnerCircle
            r={radius - STROKE_WIDTH / 2}
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2}
          />
            <image 
            href={boostTop}
            width={SVG_SIZE}
            height={SVG_SIZE}
            />
          <BoostMeterText
            $boost={spectatedPlayer.boost}
            $strokeColor={spectatedPlayer.team === 0 ? "#178BFF" : "#FF5622"}
            strokeWidth={1.5}
            x="49.60%"
            y="51.75%"
          >
            {boostPercent}
          </BoostMeterText>
        </svg>
      )}
    </BoostMeterWrapper>
  );
};
