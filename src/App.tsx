import React, { useContext, useEffect } from 'react';
import { GameStateContext, Difficulty } from './contexts'
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import './App.scss';

function App() {
  const [difficulty, setDifficulty] = React.useState(Difficulty.Easy)

  return (
    <>
      <GameStateContext.Provider value={{difficulty, setDifficulty}}>
        <h1>APP: </h1>
        Difficulty: {difficulty}
        <Board/>
        <Toolbar/>
      </GameStateContext.Provider>
    </>
  )
}

export default App;
