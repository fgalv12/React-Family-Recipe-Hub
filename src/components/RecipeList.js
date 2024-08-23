import React from "react";
import RecipeCard from "./RecipeCard";
import PropTypes from "prop-types";

function RecipeList({ recipes, onRecipeClick }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          image={recipe.image}
          name={recipe.name}
          category={recipe.category}
          onClick={() => onRecipeClick(recipe)}
        />
      ))}
    </div>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onRecipeClick: PropTypes.func.isRequired,
};

export default RecipeList;
