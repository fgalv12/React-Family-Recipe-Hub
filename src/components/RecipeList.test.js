import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeList from './RecipeList';

//Mock recipes data
const mockRecipes = [
  { id: 1, name: 'Spaghetti', category: 'Dinner', image: 'spaghetti.jpg' },
  { id: 2, name: 'Pecan Pie', category: 'Dessert', image: 'pecan-pie.jpg' },
];

//Test if the RecipeList component renders a list of recipes
test('renders a list of recipes', () => {
  render(<RecipeList recipes={mockRecipes} onRecipeClick={() => {}} />);
  expect(screen.getByText('Spaghetti')).toBeInTheDocument();
  expect(screen.getByText('Pecan Pie')).toBeInTheDocument();
});
