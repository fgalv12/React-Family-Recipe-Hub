import React from 'react';

function RecipeCard({ image, name, category, onClick }) {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={image} alt={name} className="recipe-image" />
      <div className='recipe-name'>{name}</div>
      <div className="recipe-category">{category}</div>
    </div>
  );
}

export default RecipeCard;
