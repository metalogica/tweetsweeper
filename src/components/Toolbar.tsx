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
            <li>One</li>
            <li>Two</li>  
            <li>Three</li>
            <h1>Options</h1>
            <select name="" id="" onChange={(event) => {}}>
            </select>
            <hr/>
            <h1>NEW CONTEXT</h1>
          </>
        )
      }
    </div>
  )
}

export default Toolbar
