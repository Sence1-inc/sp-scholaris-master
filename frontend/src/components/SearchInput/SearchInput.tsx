// SearchInput.tsx

import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
  placeholder: string
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  return (
    <input className="search-input" type="text" placeholder={placeholder} />
  );
};

export default SearchInput;
