import { createContext, useContext } from 'react'
import { GameProgress } from './globals'

// contexts for App.tsx
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

export enum Flags {
  Easy = 3,
  Regular = 5,
  Hard = 8,
  Test = 2,
}

export interface GameContextType {
  difficulty: Difficulty;
  theme: Theme;
  opponent: Opponent;
  gameProgress: GameProgress;
  flags: number;
  setDifficulty: (Difficulty: Difficulty) => void;
  setTheme: (Theme: Theme) => void;
  setOpponent: (Opponent: Opponent) => void;
  setGameProgress: (GameProgress: GameProgress) => void;
  setFlags: (Flags: Flags) => void;
}

export const GameContext = createContext<GameContextType>({
  difficulty: Difficulty.Easy,
  theme: Theme.Retro,
  opponent: Opponent.Trump,
  gameProgress: GameProgress.NewGame,
  flags: Flags.Easy,
  setDifficulty: () => {},
  setTheme: () => {},
  setOpponent: () => {},
  setGameProgress: () => {},
  setFlags: () => {},
})

export const useGameContext = () => useContext(GameContext)

// Context for Toolbar.tsx
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
