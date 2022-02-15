import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders text component', () => {
  render(<App />);
  const text = screen.getByText('TEST');
  expect(text).toBeInTheDocument();
});
