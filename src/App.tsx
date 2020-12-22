import React from 'react';
import { GameContext, Difficulty, Theme, Opponent} from './contexts'
import { 
  easyBoardState, 
  regularBoardState, 
  hardBoardState, 
  testBoardState,
  BoardState
} from './globals'
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import './App.scss';

function App() {
  const [difficulty, setDifficulty] = React.useState(Difficulty.Easy)
  const [theme, setTheme] = React.useState(Theme.Retro)
  const [opponent, setOpponent] = React.useState(Opponent.Trump)
  const [flags, setFlags] = React.useState(0)

  function drawBoard(difficulty: string) {
    switch(difficulty) {
      case 'easy':
        return easyBoardState
      case 'regular':
        return regularBoardState
      case 'hard':
        return hardBoardState
      case 'test':
        return testBoardState
      default:
        throw new Error('Unable to draw board.')
    }
  }

  function currentFlags(board: BoardState) {
    return board.flags
  }

  function maxFlags(board: BoardState) {
    return board.maxFlags
  }

  return (
    <>
      <GameContext.Provider value={{state: { difficulty, theme, opponent }, setDifficulty, setTheme, setOpponent}}>
        <h1>APP: </h1>
        <p>Difficulty: {difficulty}</p>
        <p>Theme: {theme}</p>
        <p>Opponent: {opponent}</p>
        <p>Current Flags: {currentFlags(drawBoard(difficulty))}</p>
        <p>Max Flags: {maxFlags(drawBoard(difficulty))}</p>
        <Board {...drawBoard(difficulty)}/>
        <Toolbar/>
      </GameContext.Provider>
    </>
  )
}

export default App;
