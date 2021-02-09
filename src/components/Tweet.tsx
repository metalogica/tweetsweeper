import { CellState } from '../globals'
import './Tweet.scss'

const helpText = `
The Trump Era has ended but his Tweets still wreck havoc in a post-truth world.\n
Be a hero and de-contaminate the falsehoods that pollute contemporary political discourse.\n
Simply right-click on the cells you think contain explosive lies.\n
Click on the Start menu below for further options.
`

const formatTweetText = (tweetContent: string) => `
  ${tweetContent.slice(0,200)}${tweetContent.length > 200 ? '...' : ''}
`

const Tweet = ({ clicked, tweet }: CellState) => (
  <div className='tweet-container' data-testid='tweet-panel'>
    <span className='tweet-ribbon'>{tweet ? 'Tweet Panel' : 'Help'}</span>
    <span className='tweet-logo'></span>
    <div className='tweet-content'>
      {
        !tweet && <div className='tweet-help-dialogue'>{helpText}</div>
      }
      { 
        tweet && (
          <>
            <span className='date' data-testid='tweet-panel-date'>{tweet.date}</span>
            <p className='content' data-testid='tweet-panel-content' >{formatTweetText(tweet.content)}</p>  
            { clicked && (
              <>
                <span>Status: <span className={tweet.lie ? 'lie' : 'truth'}>{tweet.lie ? 'Lie!' : 'True'}</span></span>
                {/* <p className='source' >Source : {tweet.source} </p> */}
              </>
            )}
          </>
        )}
    </div>
  </div>
)

export default Tweet;
