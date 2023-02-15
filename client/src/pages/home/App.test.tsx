import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000')

test('renders learn react link', () => {
  render(<App socket={socket} />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
