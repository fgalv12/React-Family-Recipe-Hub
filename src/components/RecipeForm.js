import React, { useState, useEffect } from 'react';
import Button from './Button';

function RecipeForm({ recipe = {}, onSave, onCancel }) {
  //initialize state with recipe values or empty strings
  const [name, setName] = useState(recipe.name || '');
  const [category, setCategory] = useState(recipe.category || '');
  const [image, setImage] = useState(recipe.image || '');
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState(recipe.ingredients ? recipe.ingredients.join(', ') : '');
  const [instructions, setInstructions] = useState(recipe.instructions ? recipe.instructions.join(', ') : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    //Placeholder
    let imageUrl = image;

    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const updatedRecipe = { 
      ...recipe, 
      name, 
      category, 
      image: imageUrl, 
      ingredients: ingredients.split(', ').map(item => item.trim()),
      instructions: instructions.split(', ').map(item => item.trim())
    };
    onSave(updatedRecipe);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file)); //display the image
    }
  };

  return (
    <div className="detail-navigation">  
      <div className="recipe-form">
        <form className='recipe-form' onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Recipe Name" />
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
          <input type='file' onChange={handleImageChange} accept='image/*'/>
          {image && <img src={image} alt='Preview' style={{ width: '200px', marginTop: '5px' }} />}
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (separate by commas)" />
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions (separate by commas)" />
        </form>
        <div className="detail-navigation">
          <Button label="Save" onClick={handleSubmit}/>
          <Button label="Cancel" onClick={onCancel}/>
        </div>
      </div>
    </div>
  );
}

export default RecipeForm;
