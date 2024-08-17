import React, { useState } from "react";

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for recipes"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;

