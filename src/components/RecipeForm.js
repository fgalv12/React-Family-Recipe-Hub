import React, { useState } from 'react';
import Button from './Button';
import { handleImageUpload } from '../utils/imageHelpers';

function RecipeForm({ recipe = {}, onSave, onCancel }) {
  const [name, setName] = useState(recipe.name || '');
  const [category, setCategory] = useState(recipe.category || '');
  const [image, setImage] = useState(recipe.image || '');
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState(recipe.ingredients || []);
  const [instructions, setInstructions] = useState(recipe.instructions ? recipe.instructions.join('. ') : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !instructions.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const imageUrl = handleImageUpload(image, imageFile);
    const updatedRecipe = { 
      ...recipe, 
      name, 
      category, 
      image: imageUrl, 
      ingredients: ingredients.map(item => item.trim()),
      instructions: instructions.split('.').map(item => item.trim() + '.').filter(Boolean)
    };
    onSave(updatedRecipe);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="detail-navigation">  
      <div className="recipe-form">
        <form className='recipe-form' onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Recipe Name" required/>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required/>
          <input type='file' onChange={handleImageChange} accept='image/*'/>
          {image && <img src={image} alt='Preview' style={{ width: '200px', marginTop: '5px' }} />}
          <textarea value={ingredients.join(', ')} onChange={(e) => setIngredients(e.target.value.split(', '))} placeholder="Ingredients (separate by commas)" required/>
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions (separate by periods)" required/>

        <div className="detail-navigation">
          <Button label="Save" onClick={handleSubmit}/>
          <Button label="Cancel" onClick={onCancel}/>
        </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;
