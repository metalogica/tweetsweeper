/** @jsxImportSource @emotion/react */
// import { jsx } from '@emotion/react'

import { useSettings } from '../contexts'
import './Board.scss'

function Board() { 
  const { state: { difficulty } } = useSettings();

  return (
    <div className='board-container'>
      Hello from the board component!!!
      {difficulty}
    </div>
  )
}

export default Board
