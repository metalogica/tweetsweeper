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

export type GameContextType = {
  difficulty: Difficulty;
  setDifficulty: (Difficulty: Difficulty) => void
}

export const GameContext = createContext<GameContextType>({
  difficulty: Difficulty.Easy,
  setDifficulty: () => {console.log('enum context fire')}
})

export const useGameState = () => useContext(GameContext)
