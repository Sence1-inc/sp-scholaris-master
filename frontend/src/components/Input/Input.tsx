import React from 'react';
import './Input.css';

interface InputProps {
  placeholder: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string | null
}

const Input: React.FC<InputProps> = ({ placeholder, handleChange, value }) => {
  return (
    <input value={value as string} className="search-input" type="text" placeholder={placeholder} onChange={handleChange} />
  );
};

export default Input;
