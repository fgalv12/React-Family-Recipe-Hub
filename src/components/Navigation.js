import React from "react";
import Button from "./Button";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";

function Navigation({ onHomeClick, onAddClick, onSearch }) {
  return (
    <div className="navigation">
      <Button label="Home" onClick={onHomeClick} />
      <Button label="Add" onClick={onAddClick} />
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

Navigation.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Navigation;
