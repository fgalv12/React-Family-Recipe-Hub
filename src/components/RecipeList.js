import React from 'react';
import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onRecipeClick }) {

    return (
        <div className="recipe-list">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} image={recipe.image} name={recipe.name} category={recipe.category} onClick={() => onRecipeClick(recipe)}/>
          ))}
        </div>
    );
}

export default RecipeList;
