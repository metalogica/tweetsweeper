import { useState, useContext, useEffect } from 'react'
import { useGameState, Difficulty } from '../contexts'
import { GameContext } from '../App'

function Toolbar(props: any) {
  const { difficulty, setDifficulty } = useGameState()

  let { opponent, theme, options, setOptions } = useContext(GameContext)

  const [revealed, setRevealed] = useState<boolean>(false)

  const optionHandler = (event: any) => {
    setDifficulty(Difficulty.Hard)
  }

  let gameOptions = Object.values(options).map((option, i) => (
    <option key={i} value={option}>{option}</option>
  ))

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
            <select name="" id="" onChange={(event) => optionHandler(event)}>
              {gameOptions}
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
