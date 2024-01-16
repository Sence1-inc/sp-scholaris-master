import React from 'react';
import './SearchInput.css';

interface SearchInputProps {}

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <input className="search-input" type="text" placeholder="Search Keywords" />
  );
};

export default SearchInput;