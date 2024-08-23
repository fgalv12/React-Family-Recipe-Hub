import React, { useState, useEffect } from "react";
import Button from "./Button";
import { handleImageUpload } from "../utils/imageHelpers";
import PropTypes from "prop-types";

function RecipeForm({ recipe = {}, onSave, onCancel }) {
  const [name, setName] = useState(recipe.name || "");
  const [category, setCategory] = useState(recipe.category || "");
  const [image, setImage] = useState(recipe.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState(recipe.ingredients || []);
  const [instructions, setInstructions] = useState(
    recipe.instructions ? recipe.instructions.join(". ") : ""
  );
  const [prepTime, setPrepTime] = useState(recipe.prepTime || 0);
  const [cookTime, setCookTime] = useState(recipe.cookTime || 0);
  const [totalTime, setTotalTime] = useState(recipe.totalTime || 0);

  useEffect(() => {
    // Automatically update totalTime whenever prepTime or cookTime changes
    setTotalTime(prepTime + cookTime);
  }, [prepTime, cookTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !category.trim() || !instructions.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const imageUrl = handleImageUpload(image, imageFile);
    const updatedRecipe = {
      ...recipe,
      name,
      category,
      image: imageUrl,
      ingredients: ingredients.map((item) => item.trim()),
      instructions: instructions
        .split(".")
        .map((item) => item.trim() + ".")
        .filter(Boolean),
      prepTime,
      cookTime,
      totalTime,
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
        <form className="recipe-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            placeholder="Recipe Name"
            required
          />
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          />
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              style={{ width: "200px", marginTop: "5px" }}
            />
          )}
          <textarea
            id="ingredients"
            value={ingredients.join(", ")}
            onChange={(e) => setIngredients(e.target.value.split(", "))}
            placeholder="Ingredients (separate by commas)"
            required
          />
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions (separate by periods)"
            required
          />
          <label htmlFor="prepTime">Prep Time:</label>
          <input
            type="number"
            id="prepTime"
            value={prepTime}
            onChange={(e) => setPrepTime(parseInt(e.target.value, 10) || 0)}
            placeholder="Prep Time (minutes)"
            required
          />
          <label htmlFor="cookTime">Cook Time:</label>
          <input
            type="number"
            id="cookTime"
            value={cookTime}
            onChange={(e) => setCookTime(parseInt(e.target.value, 10) || 0)}
            placeholder="Cook Time (minutes)"
            required
          />
          <label htmlFor="totalTime">Total Time: (Automatic)</label>
          <input
            type="number"
            id="totalTime"
            value={totalTime}
            readOnly
            placeholder="Total Time (calculated automatically)"
          />
          <div className="detail-navigation">
            <Button label="Save" onClick={handleSubmit} />
            <Button label="Cancel" onClick={onCancel} />
          </div>
        </form>
      </div>
    </div>
  );
}

RecipeForm.propTypes = {
  recipe: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default RecipeForm;
