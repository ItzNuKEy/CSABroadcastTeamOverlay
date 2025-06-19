import styled from "styled-components";


export const ScorebugWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  z-index: 2;
`;

export const TopBar = styled.div<{side?: 'left' | 'right'}>`
  padding: 0 24px;
  width: 1920px;
  height: 45px;

  background-color: rgb(36, 36, 36);
  color: white;
  font-size: 30px;
  font-weight: bold;
  font-family: 'Monofonto', monospace;
  white-space: nowrap;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
  letter-spacing: 1.5px;
`;

export const LittleTopper = styled.div<{ bgColor: string }>`
  padding: 0 24px;
  width: 1920px;
  height: 10px;

  background: ${({ bgColor }) => bgColor};  /* <-- key fix here */
  color: white;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Monofonto', monospace;
  white-space: nowrap;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
  letter-spacing: 1.5px;
`;

export const TeamContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const TeamNameBlock = styled.div<{
  bgColor: string;
  side?: 'left' | 'right';
}>`
  width: 260px;
  height: 65px;
  background: ${({ bgColor }) => bgColor}; /* Accept gradient string */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 12px;
  position: relative;

  clip-path: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 6px;
    background: white;
    z-index: 2;
    transform: skewX(${({ side }) => (side === 'right' ? '-23deg' : '23deg')});
    ${({ side }) =>
      side === 'left' ? 'left: 14px;' : 'right: 15px;'}
  }
`;


export const TeamNameText = styled.span`
  font-weight: bold;
  text-align: center;
  font-size: clamp(42px, 2vw, 28px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-family: 'Monofonto', monospace;
  letter-spacing: 1.5px;
`;

export const TeamLogoFloating = styled.div<{bgColor: string; side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  ${(props) => (props.side === 'left' ? 'left: -85px;' : 'right: -85px;')}
  width: 115px;
  height: 65.75px;
  background-color: rgb(36, 36, 36);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: hidden;

  clip-path: ${(props) =>
  props.side === 'left'
    ? 'polygon(0 0, 75.25% 0, 100% 100%, 24.5% 100%)'
    : 'polygon(24.5% 0, 100% 0, 75.25% 100%, 0% 100%)'};

  transition: transform 0.3s ease;
  transform: ${(props) =>
    props.side === 'left' ? 'translateX(0)' : 'translateX(0)'};

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
    background: ${({ bgColor }) => bgColor};
    z-index: 2;
    transform: skewX(${(props) => (props.side === 'right' ? '-23deg' : '23deg')});
    ${(props) =>
      props.side === 'left'
        ? 'left: 10px;'
        : 'right: 11px;'}

  &.visible {
    transform: translateX(0%);
  }
`;

export const ScoreValue = styled.div<{ bgColor: string }>`
  font-size: 65px;
  font-weight: 900;
  min-width: 73px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -1px;

  background: ${({ bgColor }) => bgColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ScoreBGRight = styled.div`
  background-color: white; /* This is your background */
  display: inline-block;
`;

//  border-radius: 7px 0px 0px 7px;

export const ScoreBGLeft = styled.div`
  background-color: white; /* This is your background */
  display: inline-block;
`;

//  border-radius: 0px 7px 7px 0px;

// export const ScoreBGFiller = styled.div`
//   background-color: rgb(36, 36, 36); /* This is your background */
//   display: inline-block;
// `;

export const SeriesScoreWrapper = styled.div<{ side: 'left' | 'right' }>`
  width: 245px;
  height: 22px;
  background-color: rgba(17, 17, 17, 0.95);
  margin-top: -5px;
  position: absolute;
  top: 70px;
  ${(props) => (props.side === 'left' ? 'left: 28px;' : 'right: 28px;')};
  z-index: 0;

  clip-path: ${(props) =>
  props.side === 'left'
    ? 'polygon(0 0, 100% 0, 100% 100%, 6% 100%)'
    : 'polygon(0% 0, 100% 0, 94% 100%, 0% 100%)'};

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 0 5px 5px;
`;

export const SeriesScoreContainer = styled.div<{ team: 'blue' | 'orange' }>`
  display: flex;
  flex-direction: ${({ team }) => (team === 'blue' ? 'row-reverse' : 'row')};
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  padding: 0 10px;
  width: 100%;
`;

export const SeriesWinBox = styled.div<{
  filled: boolean;
  teamColor: "blue" | "orange";
}>`
  width: 40px;
  height: 10px;
  margin: 0 4px;
  border: 1px solid
    ${({ teamColor }) =>
      teamColor === "blue"
        ? "rgba(6, 115, 240, 0.5)"    // light blue with 50% opacity
        : "rgba(255, 165, 0, 0.5)"};  // orange with 50% opacity

  background-color: ${({ filled, teamColor }) =>
    filled
      ? teamColor === "blue"
        ? "rgb(0, 102, 255)"
        : "rgba(255, 86, 34, 1)"
      : "rgba(44, 44, 44, 0.7)"};

  border-radius: 2px;
  transition: all 0.3s ease;
`;

export const ClockBlock = styled.div`
  position: absolute;
  width: 120px;           /* Easy to edit width */
  height: 80px;           /* Easy to edit height */
  font-size: 45px;
  font-weight: bold;
  color: white;
  background-color: rgb(36, 36, 36);
  padding: 0 16px;         /* Only horizontal padding */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Monofonto', monospace;
  z-index: 10;
  border-radius: 15px;
  left: 50%;
  transform: translateX(-49.5%);
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.5), 4px 0 8px rgba(0, 0, 0, 0.5);
`;

export const SpacerBlock = styled.div`
  width: 155px;           /* Easy to edit width */
  height: 65px;           /* Easy to edit height */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`

export const GameNumberCard = styled.div`
  position: absolute;
  top: 130px; /* adjust this based on your timer's bottom */
  left: 50.026%;
  transform: translateX(-50%);
  padding: 2px 29px;
  background-color: rgba(36, 36, 36, 0.95);
  color: white;
  font-size: 24px;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 1px;
  border-radius: 5px;
`;

//border-radius: 0px 0 5px 5px;