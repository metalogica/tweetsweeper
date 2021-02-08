import { createContext, useContext } from 'react'
import { GameProgress, BoardState, easyBoardState, NumberOfMines, CellState } from './globals'

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
  rightClickHeldDown?: boolean;
  boardState?: BoardState;
  numberOfMines?: NumberOfMines;
  currentCell?: CellState;
  setCurrentCell?: any;
  setDifficulty: (Difficulty: Difficulty) => void;
  setTheme: (Theme: Theme) => void;
  setOpponent: (Opponent: Opponent) => void;
  setGameProgress: (GameProgress: GameProgress) => void;
  setFlags: (Flags: Flags) => void;
  setRightClickHeldDown?: any;
  setNumberOfMines: (NumberOfMines: NumberOfMines) => void;
}

//default game context
export const GameContext = createContext<GameContextType>({
  difficulty: Difficulty.Easy,
  theme: Theme.Retro,
  opponent: Opponent.Trump,
  gameProgress: GameProgress.NewGame,
  boardState: easyBoardState,
  flags: Flags.Easy,
  rightClickHeldDown: false,
  numberOfMines: NumberOfMines.Easy,
  setDifficulty: () => {},
  setTheme: () => {},
  setOpponent: () => {},
  setGameProgress: () => {},
  setFlags: () => {},
  setRightClickHeldDown: () => {},
  setNumberOfMines: () => {}
})

export const useGameContext = () => useContext(GameContext)

// Context for Toolbar.tsx
export interface Options {
  difficulty: string[];
  theme: string[];
  opponent: string[];
}

export const GameOptions: Options = {
  difficulty: [
    Difficulty.Easy,
    Difficulty.Regular,
    Difficulty.Hard,
    // Difficulty.Test // add this in dev mode to manually test mine algorithm
  ],
  theme: Object.values(Theme),
  opponent: Object.values(Opponent),
}

// mouse context used by avatar in top panel: changes image if the user clicks and holds down the mouse.
export interface MouseContextType {
  rightClickHeldDown: boolean,
  setRightClickHeldDown?: () => void
}

export const defaultMouseContext = createContext<MouseContextType>({
  rightClickHeldDown: false
})

export const useMouseContext = () => useContext(defaultMouseContext)
