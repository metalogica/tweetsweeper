import { createContext, useContext } from 'react'

export enum Difficulty {
  Easy = 'easy',
  Regular = 'regular',
  Hard = 'hard',
}

export enum Theme {
  Retro = 'retro',
  Dusk = 'dusk',
}

export enum Opponent {
  Trump = 'trump',
  Biden = 'biden',
}

export type GameStateContextType = {
  difficulty: Difficulty;
  theme: Theme,
  opponent: Opponent,
  setGameState: (Difficulty: Difficulty, Theme: Theme, Opponent: Opponent) => void
}

export const GameStateContext = createContext<GameStateContextType>({
  difficulty: Difficulty.Easy,
  theme: Theme.Retro,
  opponent: Opponent.Trump,
  setGameState: () => {console.log('enum context fire')}
})

export const useGameState = () => useContext(GameStateContext)
