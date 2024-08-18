import React from 'react';
import Button from './Button';
import SearchBar from './SearchBar';

function Navigation({ onHomeClick, onAddClick, onSearch }) {
  return (
    <div className='navigation'>
      <Button label="Home" onClick={onHomeClick} />
      <Button label="Add" onClick={onAddClick} />
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

export default Navigation;
