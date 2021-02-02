import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Tweet Panel Functionality', () => {
  render(<App />);

  // the tweet panel shows a tweet
  const cell00 = screen.getByTestId('0-0')
  fireEvent(cell00, new MouseEvent('hover'))
  const tweetContentCell00 = screen.getByTestId('tweet-panel-content').textContent
  expect(tweetContentCell00).not.toBeNull()
  
  // the tweet changes when the user hovers over a different cell
  const cell01 = screen.getByTestId('0-1')
  fireEvent(cell01, new MouseEvent('hover'))
  const tweetContentCell01 = screen.getByTestId('tweet-panel-content').textContent
  expect(tweetContentCell01).not.toBeNull()

  expect(tweetContentCell00).not.toEqual(tweetContentCell01)
});
