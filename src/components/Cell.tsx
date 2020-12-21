import { CellState } from '../globals'
import './Cell.scss'

function Cell({ location, clicked, mine, flagged, neighbors, updateBoard }: CellState) {
  const style: object = setStyle(location, clicked, mine, flagged, neighbors)

  return(
    <div  className='cell' 
          data-testid={`${location[0]}-${location[1]}`} 
          style={style}
          onClick={() => updateBoard ? updateBoard(location[0], location[1]) : console.error('unable to upate cell')}
    >
    </div>
  )
}

function setStyle(location: [number, number], clicked: boolean, mine: boolean, flagged: boolean, neighbors: number) {
  const skin = { 
    backgroundImage: `url(/images/retro/unopened.svg)`,
    gridArea: `${location[0]}-${location[1]}`
  }

  if (flagged) {
    skin.backgroundImage = `url(/images/retro/flag.svg)`
  } else if (clicked && mine) {
    skin.backgroundImage = `url(/images/retro/mine.png)`
  } else if (clicked && !mine && !flagged && neighbors === 0) {
    skin.backgroundImage = `url(/images/retro/opened.svg)`
  } else if (clicked && !mine && !flagged && neighbors > 0) {
    skin.backgroundImage = `url(/images/retro/${neighbors}.svg)`
  }

  return skin;
}

export default Cell;
