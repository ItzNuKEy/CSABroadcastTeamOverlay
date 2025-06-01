import styled from "styled-components";
import { css, keyframes } from "styled-components";

export const BoostMeterRing = styled.circle<{
  $color: string;
  $dashoffset: number;
  $arcLength: number;
}>`
  stroke: ${({ $color }) => $color};
  stroke-dasharray: ${({ $arcLength }) => `${$arcLength} ${$arcLength}`};
  stroke-dashoffset: ${({ $dashoffset }) => $dashoffset};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.15s ease-in-out;
`;


export const BoostMeterInnerCircle = styled.circle`
  fill: transparent;
`;

const pulse = (color: string) => keyframes`
  0% { filter: drop-shadow(0 0 6px ${color}); }
  50% { filter: drop-shadow(0 0 12px ${color}); }
  100% { filter: drop-shadow(0 0 6px ${color}); }
`;

export const BoostMeterText = styled.text<{
  $boost: number;
  $strokeColor: string;
}>`
  font-family: 'Monofonto', monospace;
  font-size: 90px;
  fill: white;
  stroke: ${({ $strokeColor }) => $strokeColor};
  stroke-width: 5px;
  paint-order: stroke;
  text-anchor: middle;
  letter-spacing: 3px;
  dominant-baseline: middle;

  ${({ $boost, $strokeColor }) => {
    if ($boost === 100) {
      return css`
        animation: ${pulse($strokeColor)} 1s infinite;
      `;
    } else {
      const glowStrength = Math.max(0, Math.min(10, ($boost / 100) * 10));
      return css`
        filter: drop-shadow(0 0 ${glowStrength + 4}px ${$strokeColor});
      `;
    }
  }}
`;

export const BoostMeterWrapper = styled.div`
  position: absolute;
  bottom: -40px;
  right: 0px;
  height: 370px;
  width: 370px;
  margin: 0 auto;
  overflow: hidden;
  background-color: transparent;

  svg > circle {
    transform: rotate(89.25deg);
    transform-origin: 50% 50%;
  }
`;
