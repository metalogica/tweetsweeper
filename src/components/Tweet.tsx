import { CellState } from '../globals'
import './Tweet.scss'

const Tweet = ({ clicked, tweet }: CellState) => (
  <div className='tweet-container' data-testid='tweet-panel'>
    <span className='tweet-logo'></span>
    <div className='tweet-content'>
      <span className='tweet-help-dialogue'>Help to play here</span>
      { 
        tweet && (
          <div className='tweet-revealed-content'>
            <p data-testid='tweet-panel-date' className='date'>{tweet.date}</p>
            <p data-testid='tweet-panel-content' className='content'>{tweet.content}</p>  
            { clicked && (
              <div className='tweet-hidden-content'>
                <p>Status : {tweet.lie ? 'Lie!' : 'True'} </p>
                <p>Source : {tweet.source} </p>
              </div>
            )}
          </div>
        )}
    </div>
  </div>
)

export default Tweet;
