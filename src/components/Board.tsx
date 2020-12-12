/** @jsxImportSource @emotion/react */

import { useContext } from 'react'
import { GameContext } from '../App'
import { jsx } from '@emotion/react'
import './Board.scss'

function Board() { 
  const { difficulty, opponent, theme, options } = useContext(GameContext)

  return (
    <div className='board-container'>
      Hello from the board component!!!
      <p>Difficulty: {difficulty}</p>
      <p>opponent: {opponent}</p>
      <p>theme: {theme}</p>
    </div>
  )
}

export default Board
