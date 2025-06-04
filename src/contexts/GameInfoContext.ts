import { createContext } from "react";
import { GameContext } from "../models/contexts/GameContext";
import { Dispatch, SetStateAction } from "react";

export interface GameInfoContextModel {
  gameInfo: GameContext;
  setGameInfo: Dispatch<SetStateAction<GameContext>>; // ✅ updated
}

export const DEFAULT_GAME_INFO: GameContext = {
  arena: "",
  isOT: false,
  isReplay: false,
  target: "",
  timeRemaining: 300,
  winner: "",
  players: [],
  score: {
    blue: 0,
    orange: 0,
  },
  seriesScore: {
    blue: 0,
    orange: 0,
  },
  currentGameNumber: 1,
  seriesLength: 5, // default to Bo5
};


export const GameInfoContext = createContext<GameInfoContextModel>({
  gameInfo: DEFAULT_GAME_INFO,
  setGameInfo: () => {}, // this gets replaced in the provider
});
