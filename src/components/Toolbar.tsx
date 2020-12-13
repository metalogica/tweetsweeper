import { useState } from 'react'
import { GameOptions, useSettings, Difficulty } from '../contexts'

function Toolbar(props: any) {
  const [revealed, setRevealed] = useState<boolean>(false)
  
  const { setDifficulty, setTheme, setOpponent } = useSettings()

  const handleChange = (option: any) => {
    switch(option) {
      case 'easy' || 'regular' || 'hard':
        console.log(option)
        setDifficulty(option)
        break
      case 'retro' || 'dusk':
        console.log(option)
        setTheme(option)
        break
      case 'biden' || 'trump':
        console.log(option)
        setOpponent(option)
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
