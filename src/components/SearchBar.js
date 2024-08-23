import React, { useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search);
    setSearch(""); //clear search bar after search
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for recipes"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
