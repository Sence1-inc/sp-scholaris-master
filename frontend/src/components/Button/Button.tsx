import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css'

interface ButtonProps {
  children: React.ReactNode;
  url?: string;
}

const Button: React.FC<ButtonProps> = ({ children, url }) => {
  return (
    <Link to={`${url}`}>
      <button className='button'>
        {children}
      </button>
    </Link>
  );
};

export default Button;
