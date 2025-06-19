import type { USPlayer } from "../UpdateState/USPlayer"

export interface GameContext {
    winningTeamNum: number;
    arena: string;
    isOT: boolean;
    isReplay: boolean;
    target: string;
    timeRemaining: number;
    winner: string;
    players: USPlayer[];
    score: {
        blue: number;
        orange: number;
    };
    seriesScore: {
    blue: number;
    orange: number;
    };
    currentGameNumber: number;
    seriesLength: 5 | 7;
    mvpPlayer?: undefined;
};