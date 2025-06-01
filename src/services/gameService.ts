import type { USPlayer } from "../models/UpdateState/USPlayer"
import type { GoalScored } from "../models/GoalScored/GoalScored";

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

const getReplayPlayer = (players: USPlayer[], target: string): string | null => {
    const player = players.find((p) => target.includes(p.name));
    return player ? player.name : null;
};

// const getReplayMessage = (players: USPlayer[], target: string): string => {
//     const player = getPlayerFromTarget(players, target);
//     if (!player) return "REPLAY";
//     return `REPLAY: ${player.name.toUpperCase()}!`;
// };

let latestGoal: GoalScored | null = null;

const setLatestGoal = (goal: GoalScored | null) => {
    latestGoal = goal;
};

const getScorerName = (): string | null => {
    return latestGoal?.scorer?.name ?? null;
};

const getScorerTeam = (): number | null => {
    return latestGoal?.scorer?.teamnum ?? null;
};

const getGoalSpeed = (): number | null => {
    return latestGoal?.goalspeed ?? null;
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
    getReplayPlayer,
    setLatestGoal,
    getScorerName,
    getScorerTeam,
    getGoalSpeed,
};