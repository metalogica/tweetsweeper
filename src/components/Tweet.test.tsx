import { screen, render } from '@testing-library/react'
import { trumpTweets } from '../data/tweets'
import Tweet from './Tweet'

describe('Tweet Panel', () => {
  beforeEach(() => {
    const tweet = trumpTweets[0]
    render(<Tweet {...tweet}/>)
  })

  it('should load a tweet', () => {
    const actualTweet = trumpTweets[0]
    const tweet = screen.queryByTestId('tweet')
    const tweetContent = tweet?.querySelector('.content')?.textContent
    const tweetDate = tweet?.querySelector('.date')?.textContent

    expect(tweet).not.toBeNull()
    expect(tweetContent).toBe(actualTweet.content)
    expect(tweetDate).toBe(actualTweet.date)
  })
})
