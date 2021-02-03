import { CellState } from '../globals'

export default function Tweet({ clicked, mine, flagged, tweet }: CellState) { 
  if (tweet) {
    console.log(tweet)
    return(
      <>
        <div data-testid='tweet-panel'>
          <p data-testid='tweet-panel-date' className='date'></p>
          <p data-testid='tweet-panel-content' className='content'></p>  
        </div>
      </>
    )
  } else {
    return(<></>)
  }
}
