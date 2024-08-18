import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

//Test if the Button component renders a button with the correct label
test('renders the button with the correct label', () => {
  render(<Button label="Click me" onClick={() => {}} />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

//Test if the Button component calls the onClick handler when the button is clicked
test('calls onClick handler when button is clicked', () => {
  const handleClick = jest.fn();
  render(<Button label="Click me" onClick={handleClick} />);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

