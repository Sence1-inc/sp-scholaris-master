import React from 'react';
import './Input.css';

interface InputProps {
  placeholder: string;
  handleEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ placeholder, handleEmailChange }) => {
  return (
    <input className="search-input" type="text" placeholder={placeholder} onChange={handleEmailChange} />
  );
};

export default Input;
