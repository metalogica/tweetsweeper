import { CellState } from '../globals'
import './Cell.scss'

function Cell({ location, clicked, mine, flagged, neighbors }: CellState) {
  // buildStyle(clicked, mine, flagged, neighbors)
  return(
    <div className='cell' data-testid='cell' style={{backgroundImage: `url('/images/retro/unopened.svg')`}}>
      CELL
    </div>
  )
}
//'background-image': 'url(../images/retro/unopened.svg)'

function buildStyle(clicked: boolean, mine: boolean, flagged: boolean, neighbors: number) {
  // unopened
  !clicked && !flagged && console.log('worked')
  // flagged
  // mine
  // opened (neighbors)
}

export default Cell;
