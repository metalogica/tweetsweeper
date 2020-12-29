import { createContext, useContext } from 'react'
import { GameProgress } from './globals'

export enum Difficulty {
  Easy = 'easy',
  Regular = 'regular',
  Hard = 'hard',
  Test = 'test'
}

export enum Theme {
  Retro = 'retro',
  Dusk = 'dusk',
}

export enum Opponent {
  Trump = 'trump',
  Biden = 'biden',
}

export interface GameContextType {
  difficulty: Difficulty;
  theme: Theme;
  opponent: Opponent;
  gameProgress: GameProgress;
  setDifficulty: (Difficulty: Difficulty) => void;
  setTheme: (Theme: Theme) => void;
  setOpponent: (Opponent: Opponent) => void;
  setGameProgress: (GameProgress: GameProgress) => void;
}

export const GameContext = createContext<GameContextType>({
  difficulty: Difficulty.Easy,
  theme: Theme.Retro,
  opponent: Opponent.Trump,
  gameProgress: GameProgress.NewGame,
  setDifficulty: () => {},
  setTheme: () => {},
  setOpponent: () => {},
  setGameProgress: () => {},
})

export const useGameContext = () => useContext(GameContext)

interface Options {
  difficulty: string[];
  theme: string[];
  opponent: string[];
}

export const GameOptions: Options = {
  difficulty: [
    Difficulty.Easy,
    Difficulty.Regular,
    Difficulty.Hard,
    Difficulty.Test
  ],
  theme: Object.values(Theme),
  opponent: Object.values(Opponent),
}
