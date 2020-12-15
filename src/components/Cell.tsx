import { CellState } from '../globals'
import './Cell.scss'

function Cell({ location, clicked, mine, flagged, neighbors }: CellState) {
  return(
    <div  className='cell' 
          data-testid='cell' 
          style={setSkin(clicked, mine, flagged, neighbors)}
          data-location={`${location[0]}-${location[1]}`}
    >
    </div>
  )
}

function setSkin(clicked: boolean, mine: boolean, flagged: boolean, neighbors: number) {
  const skin = { backgroundImage: `url('/images/retro/unopened.svg')` }

  if (flagged) {
    skin.backgroundImage = `url('/images/retro/flag.svg')`
  } else if (clicked && mine) {
    skin.backgroundImage = `url('/images/retro/mine.png')`
  } else if (clicked && !mine && neighbors === 0) {
    skin.backgroundImage = `url('/images/retro/opened.svg')`
  } else if (clicked && !mine && neighbors > 0) {
    skin.backgroundImage = `url('/images/retro/${neighbors}.png')`
  }

  return skin;
}

export default Cell;
