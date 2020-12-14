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

  const cellState: CellState = {
    location: [0, 0],
    clicked: false,
    mine: true,
    flagged: false,
    neighbors: 0,
  } 

  return (
    <div className='board-container'>
      Hello from the board component!!!
      {
        difficulty === Difficulty.Easy && (<Cell state={cellState}></Cell>)
      }
      {
        difficulty === Difficulty.Regular && (<Cell state={cellState}></Cell>)
      }
      {
        difficulty === Difficulty.Hard && (<Cell state={cellState}></Cell>)
      }
    </div>
  )
}

export default Board
