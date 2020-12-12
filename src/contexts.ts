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
  setDifficulty: (Difficulty: Difficulty) => void
}

export const GameStateContext = createContext<GameStateContextType>({
  difficulty: Difficulty.Easy,
  setDifficulty: () => {console.log('enum context fire')}
})

export const useGameState = () => useContext(GameStateContext)
