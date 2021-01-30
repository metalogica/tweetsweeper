import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Tweet Panel Functionality', () => {
  render(<App />);

  // the tweet panel shows a tweet
  const cell00 = screen.getByTestId('0-0')
  const tweetPanel = screen.getByTestId('tweet')
  fireEvent(cell00, new MouseEvent('hover'))

  // the tweet changes when the user hovers over a different cell
});
