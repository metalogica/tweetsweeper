import { useState, useContext, useEffect } from 'react'
import { useGameState, Difficulty } from '../contexts'

function Toolbar(props: any) {
  const { difficulty, setDifficulty } = useGameState()

  const [revealed, setRevealed] = useState<boolean>(false)

  return (
    <div className='toolbar-container'>
      <span className={revealed ? 'toolbar-icon revealed' : 'toolbar-icon'} onClick={() => setRevealed(!revealed)}></span>
      {
        revealed && (
          <>
            <h4>Options</h4>
            <hr/>
            <Toggle/>
          </>
        )
      }
    </div>
  )
}

function Toggle() {
  return (
    <select name="" id="" onChange={(event) => {}}>

    </select>
  )
}

export default Toolbar
