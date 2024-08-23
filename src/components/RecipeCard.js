import React from "react";
import PropTypes from "prop-types";

function RecipeCard({ image, name, category, onClick }) {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={image} alt={name} className="recipe-image" />
      <div className="recipe-name">{name}</div>
      <div className="recipe-category">{category}</div>
    </div>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecipeCard;
