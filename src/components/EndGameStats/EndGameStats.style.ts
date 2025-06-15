import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;   /* horizontal centering */
  align-items: flex-end;     /* align everything to the bottom */
  height: 1080px;
  width: 1920px;
  background: rgba(0, 0, 0, 0.6); 
  color: white;
  font-family: "Segoe UI", sans-serif;
  font-size: 24px;
  box-sizing: border-box;
  padding-bottom: 74px; /* initial distance from bottom, adjust freely */
  position: relative; /* <-- add this */
`;

export const TeamWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end; /* makes each column bottom-aligned */
  gap: 0px;
`;

export const TeamColumn = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PlayerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px; /* fixed width for consistent layout */
  flex-shrink: 0;
`;

export const StatLabelColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -39px;
`;

export const PlayerCell = styled.div`
  width: 180px;
  text-align: center;
  font-size: 50px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Monofonto"; monospace;
`;

export const PlayerName = styled.div`
  font-size: clamp(20px, 5vw, 40px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  text-align: center;
  font-family: "Monofonto"; monospace;

  transform: translateY(-40px); 
`;


export const PlayerNameWrapper = styled.div`
  height: 110px;  /* increased from 60px to allow shifting */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* keep this to prevent overflow elsewhere */
`;


export const StatGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 41px;
`;

export const StatLabelRow = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;

  /* Manual nudge to center everything visually */
  transform: translateX(-32px);  // adjust left/right manually
`;
export const StatIcon = styled.img`
  width: 57px;
  height: 57px;
  /* Remove position: absolute, left, top, transform */
  filter: brightness(0) invert(1);
`;

export const StatLabelText = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #ccc;
  text-transform: uppercase;
  text-align: center;
`;

export const StatLabel = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #ccc;
  text-transform: uppercase;
  margin-bottom: 3px; // just a light nudge
`;

export const LineStackWrapper = styled.div`
  position: absolute;
  bottom: 57px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0.75;
  z-index: 0; /* push behind */
`;

export const Underline = styled.div<{ width?: string; height?: string }>`
  background-color:rgb(70, 70, 70);
  width: ${({ width }) => width || "60%"};
  height: ${({ height }) => height || "2px"};
`;

export const SliderWrapper = styled.div`
  display: flex;
  width: 320px;  // match PlayerCell width or desired size
  height: 10px;
  background: #222;  // background for empty bar
  border-radius: 3px;
  overflow: hidden;
  margin: 8px auto 0 auto; // center and small top margin
`;

export const BlueBar = styled.div<{ widthPercent: number }>`
  background-color: #0088ff;  // Blue team color
  width: ${({ widthPercent }) => widthPercent}%;
  transition: width 0.3s ease;
`;

export const OrangeBar = styled.div<{ widthPercent: number }>`
  background-color: #ff6600;  // Orange team color
  width: ${({ widthPercent }) => widthPercent}%;
  transition: width 0.3s ease;
`;

export const BlueTeamNameBacker = styled.div`
  position: absolute;
  top: 145px; /* Adjust to match PlayerNameWrapper */
  left: 0;
  width: 840px; /* Half of 1920px (for blue side) */
  height: 150px;
  background: linear-gradient(to top, #0088ff, transparent);
  pointer-events: none;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 12px; /* optional for smooth corners */
  border-top-right-radius: 12px;
  z-index: 0;
  overflow: hidden; /* clip the ::after line */

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 13px; /* thickness of the line */
    background: linear-gradient(-90deg, #0088ff, #00ccff); /* blue gradient */
  }
`;


export const OrangeTeamNameBacker = styled.div`
  position: absolute;
  top: 145px; /* Adjust to match PlayerNameWrapper */
  right: 0;
  width: 840px; /* Half of 1920px (for orange side) */
  height: 150px;
  background: linear-gradient(to top, #ff6600, transparent);
  pointer-events: none;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 12px;  /* optional, for smoother corners */
  border-top-right-radius: 12px;
  z-index: 0;
  overflow: hidden; /* clip the ::after line */

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 13px; /* thickness of the line */
    background: linear-gradient(90deg, #ff6600, #ff9933); /* orange gradient */
  }
`;
