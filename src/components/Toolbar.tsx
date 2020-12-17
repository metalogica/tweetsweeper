import { useState } from 'react'
import { GameOptions, useSettings, Difficulty, Theme, Opponent } from '../contexts'

function Toolbar(props: any) {
  const [revealed, setRevealed] = useState<boolean>(false)

  return (
    <div className='toolbar-container'>
      <span className={revealed ? 'toolbar-icon revealed' : 'toolbar-icon'} 
            onClick={() => setRevealed(!revealed)}
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
  const { setDifficulty, setTheme, setOpponent } = useSettings()

  // TODO: Refactor this logic to make it conform to typescript standards.
  const handleChange = (option: string) => {
    switch(option) {
      case 'easy':
        setDifficulty(Difficulty.Easy)
        break
      case 'regular':
        setDifficulty(Difficulty.Regular)
        break
      case 'hard':
        setDifficulty(Difficulty.Hard)
        break
      case 'test':
        setDifficulty(Difficulty.Test)
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
      <label>{setting}</label>
      <select key={setting} onChange={(event) => handleChange(event.target.value)}>
        {
          options.map((option: any, index: number) => (
            <option key={index}>{option}</option>
          ))
        }
      </select>
    </div>
  )
}

export default Toolbar
