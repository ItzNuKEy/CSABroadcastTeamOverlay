import { GameInfoContext } from "../../contexts/GameInfoContext";
import {
  ClockBlock,
  GameNumberCard,
  ScoreBGRight,
  ScoreBGLeft,
  ScoreValue,
  ScorebugWrapper,
  SeriesScoreContainer,
  SeriesScoreWrapper,
  SeriesWinBox,
  TeamContainer,
  TeamLogoFloating,
  TeamNameBlock,
  TeamNameText,
  SpacerBlock,
  TopBar,
  LittleTopper,
} from "./EndGameScore.style";
import { GameService } from "../../services/gameService";
import logoTeamRight from "../../assets/renecut.png"
import logoTeamLeft from "../../assets/kingslogob.png"
import { useContext } from "react";

export const EndGameScore = () => {
  const { gameInfo } = useContext(GameInfoContext);

  const blueColor = "linear-gradient(0deg, rgba(23, 23, 255, 1) 0%, rgba(23, 139, 255, 1) 100%)";
  const orangeColor = "linear-gradient(0deg, rgba(255, 86, 34, 1) 0%, rgb(212, 136, 13) 100%)";
  const littleTopperColor = "linear-gradient(90deg, rgba(23, 23, 255, 1) 0%, rgb(36, 36, 36) 50%, rgba(255, 86, 34, 1) 100%)";
  const teamNameBlue = "NIGHTMARES"; 
  const teamNameOrange = "NIGHTMARES";
  const topBarText = "WEEK 8 MATCHDAY 7 | CSA | CHALLENGER WEEK";

  const currentGameNumber = gameInfo.seriesScore.blue + gameInfo.seriesScore.orange + 1;
  const maxGames = 'BEST of 5';


  return (
    <ScorebugWrapper>
        <TopBar>{topBarText}</TopBar>
        <LittleTopper bgColor={littleTopperColor}/>
      <div style={{ display: "flex", alignItems: "center" }}>
      <TeamContainer>
        <TeamNameBlock bgColor={blueColor} side="left">
            <TeamNameText style={{ marginLeft: "22px" }}>{teamNameBlue}</TeamNameText>
        </TeamNameBlock>
        <ScoreBGLeft>
        <ScoreValue bgColor={blueColor}>{gameInfo.score.blue}</ScoreValue>
        </ScoreBGLeft>
        <TeamLogoFloating side="left"bgColor={blueColor}>
        <img src={logoTeamLeft} alt="Blue Logo" style={{ marginLeft: "9px" }}/>
        </TeamLogoFloating>
        <SeriesScoreWrapper side="left">
        <SeriesScoreContainer team='blue' style={{ marginLeft: "14px" }}>
          {[...Array(Math.ceil(gameInfo.seriesLength / 2))].map((_, i) => (
          <SeriesWinBox
          key={i}
          filled={i < gameInfo.seriesScore.blue}
          teamColor="blue"
          />
          ))}
        </SeriesScoreContainer>
      </SeriesScoreWrapper>
      </TeamContainer>

      <GameNumberCard>
      GAME {currentGameNumber} | {maxGames}
      </GameNumberCard>

      <ClockBlock>
        {GameService.getClockFromSeconds(gameInfo.timeRemaining, gameInfo.isOT)}
      </ClockBlock>

      <SpacerBlock></SpacerBlock>

      <TeamContainer>
        <ScoreBGRight>
        <ScoreValue bgColor={orangeColor}>{gameInfo.score.orange}</ScoreValue>
        </ScoreBGRight>
        <TeamNameBlock bgColor={orangeColor} side="right">
            <TeamNameText style={{ marginRight: "22px" }}>{teamNameOrange}</TeamNameText>
        </TeamNameBlock>
        <TeamLogoFloating side="right" bgColor={orangeColor}>
        <img src={logoTeamRight} alt="Orange Logo" style={{ marginRight: "9px" }}/>
        </TeamLogoFloating>

        <SeriesScoreWrapper side="right">
        <SeriesScoreContainer team='orange' style={{ marginRight: "14px" }}>
          {[...Array(Math.ceil(gameInfo.seriesLength / 2))].map((_, i) => (
          <SeriesWinBox
          key={i}
          filled={i < gameInfo.seriesScore.orange}
          teamColor="orange"
          />
          ))}
        </SeriesScoreContainer>
      </SeriesScoreWrapper>
      </TeamContainer>
      </div>
    </ScorebugWrapper>
  );
};
