import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
  placeholder: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, handleEmailChange }) => {
  return (
    <input className="search-input" type="text" placeholder={placeholder} onChange={handleEmailChange} />
  );
};

export default SearchInput;
