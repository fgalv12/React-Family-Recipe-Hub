import React from 'react';
import Button from './Button';

function RecipeDetail({ recipe, onEdit, onDelete }) {
  const handleEdit = () => {
    onEdit(recipe);
  };

  const handleDelete = () => {
    onDelete(recipe);
  };

  const handleShare = () => {
    const shareText = `
      Check out this recipe for ${recipe.name}!

      Ingredients:
      ${recipe.ingredients.join(', ')}
      
      Instructions:
      ${recipe.instructions.join(', ')}
    `;

    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: shareText,
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      console.log('Web Share API not supported');
    }
  };

  return (
    <>
      <div className="detail-navigation">
        <Button label="Edit" onClick={handleEdit}/>
        <Button label="Delete" onClick={handleDelete}/>
        <Button label="Share" onClick={handleShare}/>
      </div>
      <div className="recipe-detail">
        <div className="recipe-card-detail">
          <div>{recipe.image && <img src={recipe.image} alt={recipe.name} className="recipe-image" />}</div>
          <div className='recipe-name'>{recipe.name}</div>
          <div className="recipe-category">{recipe.category}</div>
          <h3 className='detail-info'>Ingredients:</h3>
          <div className="recipe-info">
            <ul className='list'>
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <h3 className='detail-info'>Instructions:</h3>
          <div className="recipe-info">
            <ul className='list'>
              {recipe.instructions && recipe.instructions.map((instructions, index) => (
              <li key={index}>{instructions}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetail;