import { useState } from 'react'
import { GameOptions, useSettings } from '../contexts'

function Toolbar(props: any) {
  const [revealed, setRevealed] = useState<boolean>(false)
  
  const { setDifficulty, setTheme, setOpponent } = useSettings()

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
                  <select onChange={(event) => console.log(event.target.value)}>
                    {
                      options.map((option: any, index: number) => (
                        <option key={index}>{option}</option>
                      ))
                    }
                  </select>
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
