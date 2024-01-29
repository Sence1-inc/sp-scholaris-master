import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css'

interface ButtonProps {
  children: React.ReactNode;
  url?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({ children, url, handleClick }) => {
  return (
    <Link to={`${url}`} className='button'>
      <button className='button__primary' onClick={handleClick}>
        <p>
        {children}
        </p>
      </button>
    </Link>
  );
};

export default Button;