import { CellState } from '../globals'
import './Cell.scss'

function Cell({ location, clicked, mine, flagged, neighbors, updateBoard, style }: CellState) {

  return(
    <div  className='cell' 
          data-testid={`${location[0]}-${location[1]}`} 
          style={style}
          onClick={() => updateBoard ? updateBoard(location[0], location[1]) : console.error('unable to upate cell')}
    >
    </div>
  )
}

export default Cell;
