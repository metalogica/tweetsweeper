import { useState } from 'react'
import { GameOptions, useGameContext, Difficulty, Theme, Opponent } from '../contexts'
import { GameProgress } from '../globals'

function Toolbar(props: any) {
  const [revealed, setRevealed] = useState<boolean>(false)

  return (
    <div className='toolbar-container'>
      <span className={revealed ? 'toolbar-icon revealed' : 'toolbar-icon'} 
            onClick={() => setRevealed(!revealed)}
            data-testid='toolbar-toggler'
      >
      </span>
      {
        revealed && (
          <>
            <h4>Options</h4>
            <hr/>
            {
              GameOptions && Object.entries(GameOptions).map(([setting, options], i) => (
                <Toggler key={i} setting={setting} options={options} />
              ))
            }
          </>
        )
      }
    </div>
  )
}

function Toggler({setting, options}: { setting: string, options: string[]}) {
  const { setDifficulty, setTheme, setOpponent, setGameProgress } = useGameContext()

  // TODO: Refactor this logic to make it conform to typescript standards.
  const handleChange = (option: string) => {
    switch(option) {
      case 'easy':
        setDifficulty(Difficulty.Easy)
        setGameProgress(GameProgress.NewGame)
        break
      case 'regular':
        setDifficulty(Difficulty.Regular)
        setGameProgress(GameProgress.NewGame)
        break
      case 'hard':
        setDifficulty(Difficulty.Hard)
        setGameProgress(GameProgress.NewGame)
        break
      case 'test':
        setDifficulty(Difficulty.Test)
        setGameProgress(GameProgress.NewGame)
        break
      case 'retro':
        setTheme(Theme.Retro)
        break
      case 'dusk':
        setTheme(Theme.Dusk)
        break
      case 'biden':
        setOpponent(Opponent.Biden)
        break
      case 'trump':
        setOpponent(Opponent.Trump)
        break
      default:
        return
    }
  }

  return (
    <div key={setting} className={`${setting}-select-container`}>
      <label htmlFor={setting}>{setting}</label>
      <select id={setting} data-testid='toolbar' key={setting} onChange={(event) => handleChange(event.target.value)}>
        {
          options.map((option: any, index: number) => (
            <option value={option} key={index}>{option}</option>
          ))
        }
      </select>
    </div>
  )
}

export default Toolbar
