import React, { useState } from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import Navigation from './components/Navigation';
import { resetView } from './utils/stateHelpers';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Spaghetti', category: 'Dinner', image: 'spaghetti.jpg', ingredients: ['1 Cup of Spaghetti', '1/2 Cup of Marinara Sauce', '1 lb Ground Beef', '1/4 Cup of Parmesan Cheese'], instructions: ['Boil water in a pot.', 'Add spaghetti to boiling water.', 'Cook spaghetti for 10 minutes.', 'Cook ground beef until brown and season.', 'Drain water from spaghetti.', 'Add marinara sauce, ground beef, and parmesan cheese to spaghetti.', 'Mix well and serve.'], prepTime: 10, cookTime: 20, totalTime: 30 },
    { id: 2, name: 'Pecan Pie', category: 'Desert', image: 'pecan-pie.jpg', ingredients: ['1 Cup of Sugar', '1 Cup of Corn Syrup', '1/2 Cup of Butter', '1 Teaspoon of Vanilla', '1/4 Teaspoon of Salt', '3 Large Eggs', '1 Cup of Pecans'], instructions: ['Preheat oven to 350 degrees.', 'Mix sugar, corn syrup, butter, vanilla, and salt in a bowl.', 'Add eggs and mix well.', 'Stir in pecans.', 'Pour mixture into pie crust.', 'Bake for 60 minutes.', 'Let cool and serve.'], prepTime: 20, cookTime: 60, totalTime: 80 },
    { id: 3, name: 'Chicken Tacos', category: 'Lunch/Dinner', image: 'chicken-tacos.jpg', ingredients: ['1 lb Chicken', '1 Packet of Taco Seasoning', '1/2 Cup of Water', 'Tortillas', 'Taco Toppings'], instructions: ['Cook chicken in a skillet.', 'Add taco seasoning and water.', 'Simmer for 10 minutes.', 'Cook tortillas to your liking.', 'Fill tortillas with chicken and toppings.', 'Serve.'], prepTime: 10, cookTime: 20, totalTime: 30 },
    { id: 4, name: 'Mashed Potatoes', category: 'Side', image: 'mashed-potatoes.jpg', ingredients: ['4 Russet Potatoes', '1/2 Cup of Milk', '1/4 Cup of Butter', 'Salt', 'Pepper'], instructions: ['Peel and chop potatoes.', 'Boil potatoes until soft.', 'Drain water from potatoes.', 'Mash potatoes.', 'Add milk, butter, salt, and pepper.', 'Mix well and serve.'], prepTime: 15, cookTime: 20, totalTime: 35 },
    { id: 5, name: 'Chocolate Cake', category: 'Desert', image: 'chocolate-cake.jpg', ingredients: ['1 3/4 Cups of Flour', '2 Cups of Sugar', '3/4 Cup of Cocoa Powder', '1 1/2 Teaspoons of Baking Powder', '1 1/2 Teaspoons of Baking Soda', '1 Teaspoon of Salt', '2 Eggs', '1 Cup of Milk', '1/2 Cup of Vegetable Oil', '2 Teaspoons of Vanilla Extract', '1 Cup of Boiling Water'], instructions: ['Preheat oven to 350 degrees.', 'Grease and flour two 9-inch cake pans.', 'Mix flour, sugar, cocoa, baking powder, baking soda, and salt in a bowl.', 'Add eggs, milk, oil, and vanilla.', 'Mix well.', 'Stir in boiling water.', 'Pour batter into pans.', 'Bake for 30-35 minutes.', 'Let cool and serve.'], prepTime: 20, cookTime: 35, totalTime: 55 },
    { id: 6, name: 'Pancakes', category: 'Breakfast', image: 'pancakes.jpg', ingredients: ['1 Cup of Flour', '1 Tablespoon of Sugar', '2 Teaspoons of Baking Powder', '1/2 Teaspoon of Salt', '1 Egg', '3/4 Cup of Milk', '1/4 Cup of Vegetable Oil'], instructions: ['Mix flour, sugar, baking powder, and salt in a bowl.', 'Add egg, milk, and oil.', 'Mix until smooth.', 'Pour batter onto a hot griddle.', 'Cook until bubbles form.', 'Flip and cook until golden brown.', 'Serve.'], prepTime: 10, cookTime: 20, totalTime: 30 },
    { id: 7, name: 'French Toast', category: 'Breakfast', image: 'french-toast.jpg', ingredients: ['4 Slices of Bread', '2 Eggs', '1/4 Cup of Milk', '1 Teaspoon of Cinnamon', '1 Teaspoon of Vanilla Extract', 'Butter', 'Syrup'], instructions: ['Whisk eggs, milk, cinnamon, and vanilla in a bowl.', 'Dip bread into egg mixture.', 'Cook bread in a skillet with butter.', 'Cook until golden brown.', 'Serve with syrup.'], prepTime: 10, cookTime: 10, totalTime: 20 },
    { id: 8, name: 'Biscuits and Gravy', category: 'Breakfast', image: 'biscuits-and-gravy.jpg', ingredients: ['1 Can of Biscuits', '1 lb of Sausage', '1/4 Cup of Flour', '2 Cups of Milk', 'Salt', 'Pepper'], instructions: ['Bake biscuits according to package.', 'Cook sausage in a skillet.', 'Add flour and cook for 1 minute.', 'Slowly add milk and stir until thickened.', 'Season with salt and pepper.', 'Serve over biscuits.'], prepTime: 10, cookTime: 20, totalTime: 30 },
    { id: 9, name: 'Chicken Alfredo', category: 'Dinner', image: 'chicken-alfredo.png', ingredients: ['1 lb of Fettuccine', '2 Chicken Breasts', '1/2 Cup of Butter', '1 Cup of Heavy Cream', '1 Cup of Parmesan Cheese', 'Salt', 'Pepper'], instructions: ['Cook fettuccine according to package.', 'Season chicken with salt and pepper.', 'Cook chicken in a skillet.', 'Add butter, cream, and parmesan to skillet.', 'Stir until cheese is melted.', 'Add fettuccine and mix well.', 'Serve.'], prepTime: 10, cookTime: 20, totalTime: 30 },
  ]);

  const handleHomeClick = () => {
    resetView(setCurrentView, setSelectedRecipe, setSearchTerm);
  };

  const handleViewChange = (view, recipe = null) => {
    setCurrentView(view);
    setSelectedRecipe(recipe);
  };

  const handleSaveRecipe = (recipe) => {
    if (isEditing) {
      setRecipes(recipes.map(r => r.id === recipe.id ? recipe : r));
      setIsEditing(false);
    } else {
      const newRecipe = { ...recipe, id: recipes.length + 1 };
      setRecipes([...recipes, newRecipe]);
    }
    resetView(setCurrentView, setSelectedRecipe, setSearchTerm);
  };
  
  const handleEditClick = (recipe) => {
    setUpdatedRecipe(recipe);
    setIsEditing(true);
    setCurrentView('edit');
  };

  const handleDeleteRecipe = (recipeToDelete) => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeToDelete.id));
    resetView(setCurrentView, setSelectedRecipe, setSearchTerm);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Family Recipe Hub</h1>
      </header>
      <main>
        <Navigation onHomeClick={handleHomeClick} onAddClick={() => handleViewChange('add')} onSearch={setSearchTerm} />
        {currentView === 'home' && <RecipeList recipes={filteredRecipes} onRecipeClick={(recipe) => handleViewChange('detail', recipe)} />}
        {currentView === 'detail' && selectedRecipe && <RecipeDetail recipe={selectedRecipe} onEdit={handleEditClick} onDelete={handleDeleteRecipe} />}
        {currentView === 'add' && <RecipeForm onSave={handleSaveRecipe} onCancel={() => handleViewChange('home')} />}
        {currentView === 'edit' && updatedRecipe && <RecipeForm recipe={updatedRecipe} onSave={handleSaveRecipe} onCancel={() => handleViewChange('home')} />}
      </main>
    </div>
  );
}

export default App;
