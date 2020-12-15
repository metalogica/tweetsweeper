/** @jsxImportSource @emotion/react */
// import { jsx } from '@emotion/react'
import { useState } from 'react'
import Cell from './Cell'
import { useSettings, Difficulty } from '../contexts'
import { CellState } from '../globals'
import './Board.scss'

function Board() { 
  const { state: { difficulty } } = useSettings();
  const [ newGame, setNewGame ] = useState<boolean>(true)

  const cellStateUnopened: CellState = {
    location: [0, 0],
    clicked: false,
    mine: true,
    flagged: false,
    neighbors: 0,
  } 

  const cellStateFlagged: CellState = {
    location: [0, 0],
    clicked: false,
    mine: true,
    flagged: true,
    neighbors: 0,
  } 

  const cellStateMine: CellState = {
    location: [0, 0],
    clicked: true,
    mine: true,
    flagged: false,
    neighbors: 0,
  } 

  return (
    <div className='board-container'>
      Hello from the board component!!!
      <Cell {...cellStateUnopened}></Cell>
      <Cell {...cellStateFlagged}></Cell>
      <Cell {...cellStateMine}></Cell>
    </div>
  )
}

export default Board
