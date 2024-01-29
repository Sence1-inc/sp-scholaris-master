import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css'

interface ButtonProps {
  children: React.ReactNode;
  url?: string;
}

const Button: React.FC<ButtonProps> = ({ children, url }) => {
  return (
    <Link to={`${url}`} className='button'>
      <button className='button__primary'>
        <p>
        {children}
        </p>
      </button>
    </Link>
  );
};

export default Button;