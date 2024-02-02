import React from 'react';
import './Input.css';

interface InputProps {
  placeholder: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ placeholder, handleChange }) => {
  return (
    <input className="search-input" type="text" placeholder={placeholder} onChange={handleChange} />
  );
};

export default Input;
