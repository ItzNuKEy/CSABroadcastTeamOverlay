import type { USPlayer } from "../models/UpdateState/USPlayer"
import type { GoalScored } from "../models/GoalScored/GoalScored";
import { WebsocketService } from "../services/WebsocketService"

const getOrangeTeam = (players: USPlayer[]): USPlayer[] => {
    return players.filter((player) => player.team === 1);
};

const getBlueTeam = (players: USPlayer[]): USPlayer[] => {
    return players.filter((player) => player.team === 0);
};

const getPlayerFromTarget = (players: USPlayer[], target: string): USPlayer | undefined => {
    return players.find((player) => target.includes(player.name));
};

const getClockFromSeconds = (seconds: number, isOT: boolean): string => {
    const numMinutes = Math.floor(seconds / 60);
    const numSeconds = seconds - numMinutes * 60;
    const secondsString = 
    numSeconds > 9 ? numSeconds.toString() : `0${numSeconds}`;
    return isOT 
    ? `+${numMinutes}:${secondsString}` 
    :  `${numMinutes}:${secondsString}`;
};

const getScoreFromPlayers = (players: USPlayer[]) => {
    return players.map((player) => player.score);
};

const getGoalsFromPlayers = (players: USPlayer[]): number[] => {
    return players.map((player) => player.goals);
};

const getAssistsFromPlayers = (players: USPlayer[]) => {
    return players.map((player) => player.assists);
};

const getShotsFromPlayers = (players: USPlayer[]) => {
    return players.map((player) => player.shots);
};

const getSavesFromPlayers = (players: USPlayer[]) => {
    return players.map((player) => player.saves);
};

const getDemosFromPlayers = (players: USPlayer[]) => {
    return players.map((player) => player.demos);
};

// In GameService.ts

let latestGoal: GoalScored | null = null;

const replayTagService = {
  init() {
    WebsocketService.subscribe("game", "goal_scored", (goalState: GoalScored) => {
      latestGoal = {
        scorer: {
          id: goalState.scorer.id,
          name: goalState.scorer.name,
          teamnum: goalState.scorer.teamnum
        },
        assister: goalState.assister?.name ? { name: goalState.assister.name } : undefined,
        goalspeed: goalState.goalspeed ?? 0,
        ball_last_touch: goalState.ball_last_touch,
        impact_location: goalState.impact_location
      };

      console.log("[GameService] New goal recorded:", latestGoal);
    });
  },

  getLatestGoal(): GoalScored | null {
    return latestGoal;
  },

  clearLatestGoal() {
    latestGoal = null;
  }
};


export const GameService = {
    getOrangeTeam,
    getBlueTeam,
    getPlayerFromTarget,
    getClockFromSeconds,
    getScoreFromPlayers,
    getGoalsFromPlayers,
    getAssistsFromPlayers,
    getShotsFromPlayers,
    getSavesFromPlayers,
    getDemosFromPlayers,
    replayTagService,
};