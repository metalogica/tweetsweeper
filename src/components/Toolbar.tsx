import { useState } from 'react'
import { GameOptions, useSettings, Difficulty, Theme, Opponent } from '../contexts'

function Toolbar(props: any) {
  const [revealed, setRevealed] = useState<boolean>(false)
  
  const { setDifficulty, setTheme, setOpponent } = useSettings()

  const handleChange = (option: any) => {
    console.log(option)
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
              GameOptions && Object.entries(GameOptions).map(([setting, options], i) => {
                return(
                  <div>
                    <label>{setting}</label>
                    <select key={i} onChange={(event) => handleChange(event.target.value)}>
                      {
                        options.map((option: any, index: number) => (
                          <option key={index}>{option}</option>
                        ))
                      }
                    </select>
                  </div>
                )
              })
            }
          </>
        )
      }
    </div>
  )
}

export default Toolbar
