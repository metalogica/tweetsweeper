import React from 'react';
import { GameContext, Difficulty } from './contexts'
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import './App.scss';

function App() {
  const [difficulty, setDifficulty] = React.useState(Difficulty.Easy)

  return (
    <>
      <GameContext.Provider value={{difficulty, setDifficulty}}>
        <h1>APP: </h1>
        Difficulty: {difficulty}
        <Board/>
        <Toolbar/>
      </GameContext.Provider>
    </>
  )
}

export default App;
